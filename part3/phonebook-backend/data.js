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
  // if (!person.name) {
  //   return {
  //     added: false,
  //     error: "name must be specified",
  //   };
  // }

  // if (!person.number) {
  //   return {
  //     added: false,
  //     error: "number must be specified",
  //   };
  // }

  if (getPersonByName(person.name)) throw new Error("Name must be unique");

  const personToAdd = new Person({
    name: person.name,
    number: person.number,
  });

  const addedPerson = await personToAdd.save();
  console.log("person saved: ", addedPerson);

  return addedPerson;
};

const getPersonById = async (id) => {
  const person = await Person.findById(id);
  if (!person) throw new Error(`person with id ${id} could not be found`);
  return person;
};

const getPersonByName = (name) => {
  return phoneBook.find((entry) => entry.name === name);
};

const getPhoneBook = async () => {
  const persons = await Person.find({});
  return persons;
};

const getSize = async () => {
  const persons = await Person.find({});
  return persons.length;
};

const updatePerson = async (id, name, number) => {
  try {
    const person = await getPersonById(id);
    person.name = name;
    person.number = number;
    const updatedPerson = await person.save();
    return updatedPerson;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPhoneBook,
  deletePerson,
  getPersonById,
  addPerson,
  updatePerson,
  getSize,
};
