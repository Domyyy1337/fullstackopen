let phoneBook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const deletePerson = (id) => {
  const initialSize = phoneBook.length;
  phoneBook = phoneBook.filter((entry) => entry.id !== id);

  return initialSize !== phoneBook.length;
};

const addPerson = (person) => {
  if (!person.name) {
    return {
      added: false,
      error: "name must be specified",
    };
  }

  if (!person.number) {
    return {
      added: false,
      error: "number must be specified",
    };
  }

  if (getPersonByName(person.name)) {
    return {
      added: false,
      error: "name must be unique",
    };
  }

  phoneBook = phoneBook.concat(person);

  return {
    added: true,
    error: null,
    addedPerson: getPersonById(person.id),
  };
};

const getPersonById = (id) => {
  return phoneBook.find((entry) => entry.id === id);
};

const getPersonByName = (name) => {
  return phoneBook.find((entry) => entry.name === name);
};

const getPhoneBook = () => {
  return phoneBook;
};

module.exports = { getPhoneBook, deletePerson, getPersonById, addPerson };
