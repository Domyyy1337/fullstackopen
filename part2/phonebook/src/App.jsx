import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response.data);
      setPersons(response.data);
    });
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>PhoneBook</h2>
      <Filter onChange={handleFilterChange} value={filter} />
      <Form
        nameValue={newName}
        numberValue={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <PhoneBook persons={filteredPersons} />
    </div>
  );
};

const PhoneBook = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </ul>
  );
};

const Person = ({ person }) => (
  <li>
    {person.name} - {person.number}
  </li>
);

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        type="text"
        name="filter"
        id="filter"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const Form = ({
  nameValue,
  onNameChange,
  numberValue,
  onNumberChange,
  onSubmit,
}) => {
  return (
    <form>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={nameValue}
        onChange={onNameChange}
      />
      <label htmlFor="number">Number:</label>
      <input
        type="tel"
        name="number"
        id="number"
        value={numberValue}
        onChange={onNumberChange}
      />
      <div>
        <button type="submit" onClick={onSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

export default App;
