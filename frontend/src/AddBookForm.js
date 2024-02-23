import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const AddBookForm = () => {
  const [borrower, setBorrower] = useState('');
  const [book, setBook] = useState('');
  const [id, setId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dueDate, setDueDate] = useState('');
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
    axios.post('http://localhost:3001/books', { borrower: borrower, mobile_number: mobileNumber, book_title: book, due_date: dueDate })
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

  // Function to format the due date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date as per locale
  };

  return (
    <div className="homepage-container">
      <div className="library-container">
        <h1>Library Management System</h1>
        <div className="add-book-section">
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="Person ID" style={{ marginRight: '10px' }} />
          <input type="text" value={borrower} onChange={(e) => setBorrower(e.target.value)} placeholder="Borrower Name" style={{ marginRight: '10px' }} />
          <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Mobile Number" style={{ marginRight: '10px' }} />
          <input type="text" value={book} onChange={(e) => setBook(e.target.value)} placeholder="Book Title" style={{ marginRight: '10px' }} />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Due Date" style={{ marginRight: '10px' }} />
          <div style={{ marginTop: '20px' }}>
            <Button onClick={handleAddBook} style={{}} className='gm-btn gb-cutter' type='dashed' ghost >Add Book</Button>
          </div>
        </div>
        <div className="borrowed-books-section">
          <h2>Borrowed Books</h2>
          <div className="book-cards-container">
            {borrowedBooks.map(borrowedBook => (
              <div key={borrowedBook.id} className="book-card">
                <div>
                  <span style={{ color: '#720026', fontWeight: 'bold' }}>Person: </span>
                  <span style={{ textTransform: 'uppercase' }}>{borrowedBook.borrower}</span>
                </div>
                <div>
                  <span style={{ color: '#720026', fontWeight: 'bold' }}>Mobile Number: </span>
                  <span>{borrowedBook.mobile_number}</span> {/* Display the mobile number */}
                </div>
                <div>
                  <span style={{ color: '#720026', fontWeight: 'bold' }}>Book: </span>
                  <span style={{ textTransform: 'uppercase' }}>{borrowedBook.book_title}</span>
                </div>
                <div>
                  <span style={{ color: '#720026', fontWeight: 'bold' }}>Due Date: </span>
                  <span>{formatDate(borrowedBook.due_date)}</span> {/* Display the formatted due date */}
                  <Button onClick={() => handleDeleteBook(borrowedBook.id)} type="primary" style={{backgroundColor:'#416D19'}}>Returned<CheckCircleOutlined /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookForm;
