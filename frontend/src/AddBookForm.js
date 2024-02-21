import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBookForm = () => {
  const [borrower, setBorrower] = useState('');
  const [book, setBook] = useState('');
  const [id, setId] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Fetch borrowed books data when component mounts
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = () => {
    axios.get('http://localhost:3001/books')
      .then(response => {
        setBorrowedBooks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleAddBook = () => {
    axios.post('http://localhost:3001/books', { borrower: borrower, book_title: book })
      .then(response => {
        console.log(response.data);
        // Update the UI with the new entry
        fetchBorrowedBooks(); // Fetch updated data after adding a new book
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteBook = (bookId) => {
    axios.delete(`http://localhost:3001/books/${bookId}`)
      .then(response => {
        console.log(response.data);
        // Update the UI to remove the deleted entry
        fetchBorrowedBooks(); // Fetch updated data after deleting a book
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <input type="text" value={borrower} onChange={(e) => setBorrower(e.target.value)} placeholder="Borrower Name" />
        <input type="text" value={book} onChange={(e) => setBook(e.target.value)} placeholder="Book Title" />
        <button onClick={handleAddBook}>Add Book</button>
      </div>
      <div>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="Book ID" />
      </div>
      <div>
        <h2>Borrowed Books</h2>
        <ul>
          {borrowedBooks.map(borrowedBook => (
            <li key={borrowedBook.id}>
              Borrower: {borrowedBook.borrower}, Book: {borrowedBook.book_title}
              <button onClick={() => handleDeleteBook(borrowedBook.id)}>Return Book</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddBookForm;
