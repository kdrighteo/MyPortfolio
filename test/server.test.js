const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_test');
});

afterAll(async () => {
  // Cleanup and close connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should return 200 OK', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('POST /api/contact', () => {
    it('should create a new contact message', async () => {
      const response = await request(app)
        .post('/api/contact')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message'
        });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Message sent successfully');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/contact')
        .send({});
      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/login', () => {
    it('should validate login credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD
        });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          username: 'wrong',
          password: 'wrong'
        });
      expect(response.status).toBe(400);
    });
  });
});
