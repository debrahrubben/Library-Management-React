import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';

const AddBookForm = () => {
  const [borrower, setBorrower] = useState('');
  const [book, setBook] = useState('');
  const [id, setId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [logs, setLogs] = useState([]);
  const [personName, setPersonName] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [entryPersonId, setEntryPersonId] = useState('');
  const [exitPersonId, setExitPersonId] = useState('');

  useEffect(() => {
    // Fetch borrowed books data when component mounts
    fetchBorrowedBooks();
    fetchLogs();
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

  const fetchLogs = () => {
    axios.get('http://localhost:3001/logs')
      .then(response => {
        setLogs(response.data);
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
              // Reset input fields
      setBorrower('');
      setMobileNumber('');
      setBook('');
      setDueDate('');
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

  const handleEntry = () => {
    axios.post('http://localhost:3001/logs/entry', { personId: entryPersonId, personName: personName })
      .then(response => {
        console.log(response.data);
        // Update the UI with the new entry
        fetchLogs(); // Fetch updated logs data after adding a new entry
        setEntryPersonId('');
        setPersonName('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleExit = () => {
    axios.post('http://localhost:3001/logs/exit', { personId: exitPersonId })
      .then(response => {
        console.log(response.data);
        // Update the UI with the new exit
        fetchLogs(); // Fetch updated logs data after adding a new exit
         // Reset input field
         setExitPersonId('');
      setExitPersonId('');
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
  const handleClearLogs = () => {
    axios.delete('http://localhost:3001/logs')
      .then(response => {
        console.log(response.data);
        // Update the UI to reflect changes
        fetchLogs(); // Fetch updated logs data after clearing all logs
      })
      .catch(error => {
        console.error(error);
      });
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
            <Button onClick={handleAddBook} style={{}}  type='dashed' ghost >Add Book</Button>
          </div>
        </div>
       
        <div className="borrowed-books-section">
          
          <Row>
      <Col span={10}>  <h2>Borrowed Books</h2>
      <div className="book-cards-container"> 

            {borrowedBooks.slice().reverse().map(borrowedBook => (
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
                  <Button onClick={() => handleDeleteBook(borrowedBook.id)} type="primary" style={{ backgroundColor: '#416D19' }}>Returned<CheckCircleOutlined /></Button>
                </div>
              </div>
            ))}
          </div>
        </Col>
      <Col span={14}  style={{paddingLeft:'15px',}}>
      <h2 style={{textAlign:'right'}}>Logs</h2>
      
          <div className="logs-list">
          <div className='book-card' style={{height:'auto',}}>
          <div className="entry-exit-section">
          {/* Entry Form */}
          <span className="entry-form">
            <input type="text" placeholder="Person Name" value={personName} onChange={(e) => setPersonName(e.target.value)} />
          </span>
          {/* Exit Form */} 
          <span className="exit-form">
          <input type="text" placeholder="Person ID" value={entryPersonId} onChange={(e) => setEntryPersonId(e.target.value)} />
          <Button onClick={handleEntry} type='dashed' ghost>Log Entry</Button>
         <input type="text" placeholder="Person ID" value={exitPersonId} onChange={(e) => setExitPersonId(e.target.value)} />

            <Button onClick={handleExit} type='dashed' ghost>Log Exit</Button>
          </span>
          <Button onClick={handleClearLogs}>Clear All Logs</Button>
        </div>
            {logs.slice().reverse().map(log => (
              <div key={log.id} className="log-item">
                <span className="log-person" style={{marginRight:'20px',}}> <span style={{color: '#720026'}}>Name:</span> {log.person_name}</span>
                <span className="log-time" style={{marginRight:'20px',}}><span style={{color: '#720026'}}>In:</span>{new Date(log.entry_time).toLocaleString()}</span>
                <span style={{color: '#720026'}}>Out:</span>{log.exit_time ? <span className="log-time">{new Date(log.exit_time).toLocaleString()}</span>
                  : <span className="log-time" >Still in Library</span>}
              </div>
            ))}
          </div>
          
        </div>
        </Col>
    </Row>
      </div>
    </div>
    </div>
  );
};

export default AddBookForm;
