import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BorrowedBooks = () => {
  const [books, setBooks] = useState([]);
  const [personName, setPersonName] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {
      const response = await axios.get('/api/borrowed_books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
      setError('Error fetching borrowed books');
    }
  };

  const handleAddBook = async () => {
    try {
      await axios.post('/api/borrowed_books', { person_name: personName, book_title: bookTitle });
      fetchBorrowedBooks();
      setPersonName('');
      setBookTitle('');
    } catch (error) {
      console.error('Error adding borrowed book:', error);
      setError('Error adding borrowed book');
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`/api/borrowed_books/${id}`);
      fetchBorrowedBooks();
    } catch (error) {
      console.error('Error deleting borrowed book:', error);
      setError('Error deleting borrowed book');
    }
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <h2>Borrowed Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.person_name} borrowed {book.book_title}
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Add Borrowed Book</h3>
      <input type="text" placeholder="Person Name" value={personName} onChange={(e) => setPersonName(e.target.value)} />
      <input type="text" placeholder="Book Title" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} />
      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
};

export default BorrowedBooks;
