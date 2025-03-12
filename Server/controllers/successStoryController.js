const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'marya2005',
  database: process.env.DB_NAME || 'donate_db',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432
});

// جلب جميع القصص
exports.getStories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "SuccessStories" ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch success stories', details: error.message });
  }
};

// إضافة قصة نجاح جديدة
exports.createStory = async (req, res) => {
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
    res.status(500).json({ error: 'Failed to add success story', details: error.message });
  }
};
