# Modern Portfolio Website

A modern, responsive portfolio website with features like file upload, admin dashboard, contact form, and dynamic content management.

## Features

- 🎨 Modern UI with smooth animations
- 📱 Fully responsive design
- 🔐 Admin dashboard with authentication
- 📁 File upload system (images, videos, PDFs)
- 📧 Contact form with MongoDB storage
- 🖼️ Gallery with Fancybox preview
- 🍞 Dynamic breadcrumb navigation
- 🎯 Smooth scrolling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

4. Start MongoDB:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Windows
net start MongoDB

# On Linux
sudo systemctl start mongod
```

5. Start the server:
```bash
npm start
```

6. Visit `http://localhost:3001` in your browser

## Project Structure

```
portfolio-website/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── main.js
├── uploads/
├── server.js
├── package.json
└── README.md
```

## Dependencies

- Express.js - Web framework
- MongoDB/Mongoose - Database
- Multer - File upload handling
- JWT - Authentication
- Bcrypt - Password hashing
- Express-session - Session management
- Dotenv - Environment variables
- Bootstrap - UI framework
- Font Awesome - Icons
- Fancybox - Media preview

## Admin Access

Default admin credentials:
- Username: admin
- Password: admin123

Change these in the `.env` file for production.

## Features Usage

### File Upload
- Supported formats: Images (jpg, png, gif), Videos (mp4, webm, mov), PDFs
- Max file size: 10MB
- Files are stored in the `uploads` directory

### Contact Form
- Messages are stored in MongoDB
- View messages in the admin dashboard
- Required fields: name, email, message

### Admin Dashboard
- Access via the "Admin" link in navigation
- Manage uploaded files
- View contact form submissions
- Protected routes with JWT authentication

## Customization

1. Colors - Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #4361ee;
    --secondary-color: #3f37c9;
    --accent-color: #4cc9f0;
    ...
}
```

2. Content - Edit sections in `index.html`

3. Backend Configuration - Modify `server.js`

## Development

Run in development mode with nodemon:
```bash
npm run dev
```

## Production Deployment

1. Update `.env` with production values
2. Set secure session cookies
3. Use production MongoDB instance
4. Set up proper error logging
5. Enable HTTPS
6. Add rate limiting

## License

MIT License - Feel free to use this project for your portfolio

## Support

For issues or questions, please open an issue in the repository.
