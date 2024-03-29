
const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// PostgreSQL pool configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test1', // Updated to the 'test1' database
    password: '1234',
    port: 5432,
});

// Database initialization script
function createLogsTable() {
    pool.query(`CREATE TABLE IF NOT EXISTS logs (
        id SERIAL PRIMARY KEY,
        personId VARCHAR(255) NOT NULL,
        person_name VARCHAR(255) NOT NULL,
        entry_time TIMESTAMP NOT NULL,
        exit_time TIMESTAMP
    )`, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Logs table created successfully');
        }
    });
}
// Create logs table and start the Express server
createLogsTable();

// Routes for adding and deleting books

// Add a book to the library
app.post('/books', (req, res) => {
    const { borrower, book_title, mobile_number, due_date } = req.body;

    pool.query('INSERT INTO library (borrower, book_title, mobile_number, due_date) VALUES ($1, $2, $3, $4) RETURNING *', [borrower, book_title, mobile_number, due_date], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to add book to the library' });
        } else {
            res.status(201).json({ message: 'Book added successfully', book: result.rows[0] });
        }
    });
});

// Delete a book from the library
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;

  pool.query('DELETE FROM library WHERE id = $1', [bookId], (err) => {
      if (err) {
          console.error(err);
          res.status(500).json({ message: 'Failed to delete book from the library' });
      } else {
          res.status(200).json({ message: 'Book deleted successfully' });
      }
  });
});

// Add route to get all books
app.get('/books', (req, res) => {
  pool.query('SELECT * FROM library', (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).json({ message: 'Failed to fetch books' });
      } else {
          res.status(200).json(result.rows);
      }
  });
});
// Database initialization script
function createLibraryTable() {
    pool.query(`CREATE TABLE IF NOT EXISTS library (
        id SERIAL PRIMARY KEY,
        borrower VARCHAR(255) NOT NULL,
        mobile_number VARCHAR(255) NOT NULL,
        book_title VARCHAR(255) NOT NULL,
        due_date DATE NOT NULL
    )`, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Library table created successfully');
        }
    });
}

// Create library table and start the Express server
createLibraryTable();

app.listen(3001, () => {
    console.log('Server running on port 3001');
});


// Add a log for entry
app.post('/logs/entry', (req, res) => {
    const { personId, personName } = req.body; // Parse both person ID and person name from request body
    const entryTime = new Date(); // Capture current date and time
    pool.query('INSERT INTO logs (personId, person_name, entry_time) VALUES ($1, $2, $3) RETURNING *', [personId, personName, entryTime], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to add entry log' });
        } else {
            res.status(201).json({ message: 'Entry log added successfully', log: result.rows[0] });
        }
    });
});


// Add a log for exit
app.post('/logs/exit', (req, res) => {
    const { personId } = req.body;
    const exitTime = new Date(); // Capture current date and time
    pool.query('UPDATE logs SET exit_time = $1 WHERE personId = $2 RETURNING *', [exitTime, personId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to add exit log' });
        } else {
            res.status(200).json({ message: 'Exit log added successfully', log: result.rows[0] });
        }
    });
});


// Get all logs
app.get('/logs', (req, res) => {
    pool.query('SELECT * FROM logs', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to fetch logs' });
        } else {
            res.status(200).json(result.rows);
        }
    });
});

// Add route to clear all logs
app.delete('/logs', (req, res) => {
    pool.query('DELETE FROM logs', (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to clear logs' });
        } else {
            res.status(200).json({ message: 'All logs cleared successfully' });
        }
    });
});

