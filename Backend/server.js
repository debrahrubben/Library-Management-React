// backend/server.js

import express from 'express';
import bodyParser from 'body-parser';
import { Pool } from 'pg';

const app = express();
const port = 5000;

app.use(bodyParser.json());

const pool = new Pool({
  user: 'rubben',
  host: 'localhost',
  database: 'library',
  password: '1234',
  port: 5432,
});

// GET all borrowed books
app.get('/api/borrowed_books', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM borrowed_books');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST a borrowed book
app.post('/api/borrowed_books', async (req, res) => {
  const { person_name, book_title } = req.body;
  try {
    await pool.query('INSERT INTO borrowed_books (person_name, book_title) VALUES ($1, $2)', [person_name, book_title]);
    res.status(201).json({ message: 'Book borrowed successfully' });
  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE a borrowed book
app.delete('/api/borrowed_books/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM borrowed_books WHERE id = $1', [id]);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
