

function Person({ name, book, onDelete }) {
  return (
    <div>
      <p style={{color:'white'}}>Name: {name}</p>
      <p style={{color:'white'}}>Book Borrowed: {book}</p>
      <button onClick={onDelete} style={{color:'red'}}>Delete</button>
    </div>
  );
}

export default Person;
