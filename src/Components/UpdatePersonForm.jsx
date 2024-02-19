import { useState } from 'react';

function UpdatePersonForm({ initialName, initialBook, onUpdate }) {
  const [name, setName] = useState(initialName);
  const [book, setBook] = useState(initialBook);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !book.trim()) return;
    onUpdate({ name, book });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Person and Book Borrowed</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Book Borrowed:
        <input
          type="text"
          value={book}
          onChange={(e) => setBook(e.target.value)}
        />
      </label>
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdatePersonForm;
