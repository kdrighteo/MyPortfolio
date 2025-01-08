require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  createAdminUser(); // Create admin user on startup
}).catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(session({
  secret: process.env.JWT_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set to true if using https
}));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Models
const User = mongoose.model('User', {
  username: String,
  password: String,
  isAdmin: Boolean
});

const Contact = mongoose.model('Contact', {
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// Create admin user function
async function createAdminUser() {
  try {
    const adminExists = await User.findOne({ username: process.env.ADMIN_USERNAME || 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
      const admin = new User({
        username: process.env.ADMIN_USERNAME || 'admin',
        password: hashedPassword,
        isAdmin: true
      });
      await admin.save();
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|webm|mov|pdf)$/)) {
      return cb(new Error('Only image, video, and PDF files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const token = req.session.token;
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Admin middleware
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin access required' });
  next();
};

// Auth routes
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'your-secret-key'
    );
    
    req.session.token = token;
    res.json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out successfully' });
});

// Contact route
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
});

// Admin routes
app.get('/api/admin/messages', authenticateToken, isAdmin, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

app.delete('/api/admin/files/:filename', authenticateToken, isAdmin, (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Delete file error:', err);
      return res.status(500).json({ error: 'Error deleting file' });
    }
    res.json({ message: 'File deleted successfully' });
  });
});

// File routes
app.post('/upload', authenticateToken, upload.array('files'), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  res.send('Files uploaded successfully!');
});

app.get('/files', async (req, res) => {
  fs.readdir('uploads/', (err, files) => {
    if (err) {
      console.error('Read directory error:', err);
      return res.status(500).json({ error: 'Error reading uploads directory' });
    }
    
    const fileList = files.map(filename => {
      return {
        name: filename,
        url: `/uploads/${filename}`,
        type: path.extname(filename).toLowerCase()
      };
    });
    
    res.json(fileList);
  });
});

// Add production security headers
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
