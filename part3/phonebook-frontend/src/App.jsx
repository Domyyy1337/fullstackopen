import { useEffect, useState } from "react";
import "./App.css";
import personService from "./services/persons.js";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    text: null,
    isError: false,
  });

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
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

  const handleDeleteItem = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then((deletedPerson) => {
          setPersons(
            persons.filter((person) => person.id !== deletedPerson.id),
          );
          sendNotification(`Deleted ${deletedPerson.name}`);
        })
        .catch((error) => {
          setPersons(persons.filter((person) => person.id !== id));
          sendNotification(
            `Information of ${name} has already been removed from server`,
            true,
          );
        });
    }
  };

  const sendNotification = (text, isError = false) => {
    setNotification({ text, isError });
    setTimeout(() => setNotification({ text: null, isError: false }), 5000);
  };

  const addPerson = (event) => {
    const person = { name: newName, number: newNumber };
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      if (
        !confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        return;
      }
      const id = persons.find((person) => person.name === newName).id;
      personService
        .update(id, person)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person,
            ),
          );
          sendNotification(`Updated ${updatedPerson.name}`);
        })
        .catch((error) =>
          sendNotification(`Could not update ${newName}`, true),
        );

      return;
    }
    personService
      .create(person)
      .then((newPerson) => setPersons(persons.concat(newPerson)));
    setNewName("");
    setNewNumber("");
    sendNotification(`Added ${newName}`);
  };

  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification text={notification.text} isError={notification.isError} />
      <Filter onChange={handleFilterChange} value={filter} />
      <Form
        nameValue={newName}
        numberValue={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <PhoneBook persons={filteredPersons} handleDelete={handleDeleteItem} />
    </div>
  );
};

const PhoneBook = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.id} person={person} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};

const Person = ({ person, handleDelete }) => (
  <li>
    {person.name} - {person.number}{" "}
    <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
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
