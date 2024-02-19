
import Person from './Person';

function PeopleList({ people, deletePerson }) {
  return (
    <div>
      <h2 style={{color:'white'}}>People and Books Borrowed</h2>
      {people.length === 0 ? (
        <p style={{color:'white'}}>No people added yet.</p>
      ) : (
        <ul>
          {people.map((person, index) => (
            <li key={index}>
              <Person
                name={person.name}
                book={person.book}
                onDelete={() => deletePerson(index)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PeopleList;
