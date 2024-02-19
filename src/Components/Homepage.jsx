import { useState } from 'react';
import AddPersonForm from './AddPersonForm';
import PeopleList from './PeopleList';
import './Homepage.css'; // Import the CSS file

function Homepage() {
  const [people, setPeople] = useState([]);

  const addPerson = (person) => {
    setPeople([...people, person]);
  };

  const deletePerson = (index) => {
    const updatedPeople = [...people];
    updatedPeople.splice(index, 1);
    setPeople(updatedPeople);
  };

  return (
    <div className="homepage-container">
      <h1 className="heading" >Library Management System</h1>
      <div className="content">
        <AddPersonForm addPerson={addPerson}style={{color:'white'}} />
        <PeopleList people={people} deletePerson={deletePerson}  />
      </div>
    </div>
  );
}

export default Homepage;
