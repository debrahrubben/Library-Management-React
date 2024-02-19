import  { useState } from 'react';

function AddPersonForm({ addPerson }) {
  const [name, setName] = useState('');
  const [book, setBook] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !book.trim()) return;
    addPerson({ name, book });
    setName('');
    setBook('');
  };

  return (
    <form onSubmit={handleSubmit} >
      <h2 style={{color:'white'}}>Add Person and Book Borrowed</h2>
      <label style={{color:'white'}}>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label style={{color:'white'}}>
        Book Borrowed:
        <input
          type="text"
          value={book}
          onChange={(e) => setBook(e.target.value)}
        />
      </label>
      <button type="submit" style={{color:'brown'}}>Add Person</button>
    </form>
  );
}

export default AddPersonForm;
