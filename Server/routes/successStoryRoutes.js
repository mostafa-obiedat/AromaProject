const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000; // Changed default to 4000

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Configure PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'marya2005',
  database: process.env.DB_NAME || 'donate_db',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Successfully connected to PostgreSQL database');
    release();
  }
});

// Success Stories API routes
app.get('/api/success-stories', async (req, res) => {
  try {
    // Debug information
    console.log('GET /api/success-stories requested');
    
    const result = await pool.query('SELECT * FROM "SuccessStories" ORDER BY id DESC');
    
    // Debug information
    console.log(`Retrieved ${result.rows.length} records`);
    
    // Explicitly set content type
    res.setHeader('Content-Type', 'application/json');
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    
    // Detailed error response
    res.status(500).json({
      error: 'Failed to fetch success stories',
      details: error.message,
      hint: 'Check if the SuccessStories table exists and contains the expected columns'
    });
  }
});

app.post('/api/success-stories', async (req, res) => {
  const { studentName, university, story, imageUrl } = req.body;
  
  if (!studentName || !university || !story) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const result = await pool.query(
      'INSERT INTO "SuccessStories" (studentName, university, story, imageUrl) VALUES ($1, $2, $3, $4) RETURNING *',
      [studentName, university, story, imageUrl || null]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding success story:', error);
    res.status(500).json({ error: 'Failed to add success story', details: error.message });
  }
});

// Add a simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working correctly' });
});

// Handle root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'TAMAM Success Stories API',
    endpoints: [
      { method: 'GET', path: '/api/success-stories', description: 'Get all success stories' },
      { method: 'POST', path: '/api/success-stories', description: 'Add a new success story' },
      { method: 'GET', path: '/api/test', description: 'Test API connection' }
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});