const Person = require("./models/person");

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

const deletePerson = async (id) => {
  const result = await Person.findByIdAndDelete(id);

  return result;
};

const addPerson = async (person) => {
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

  const personToAdd = new Person({
    name: person.name,
    number: person.number,
  });

  const result = await personToAdd.save();
  console.log("person saved: ", result);

  return {
    added: true,
    error: null,
    addedPerson: result,
  };
};

const getPersonById = async (id) => {
  const person = Person.findById(id);
  return person;
};

const getPersonByName = (name) => {
  return phoneBook.find((entry) => entry.name === name);
};

const getPhoneBook = async () => {
  const persons = await Person.find({});
  return persons;
};

module.exports = { getPhoneBook, deletePerson, getPersonById, addPerson };
