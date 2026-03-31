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
  phoneBook = phoneBook.concat(person);
};

const getPersonById = (id) => {
  return phoneBook.find((entry) => entry.id === id);
};

const getPhoneBook = () => {
  return phoneBook;
};

module.exports = { getPhoneBook, deletePerson, getPersonById, addPerson };
