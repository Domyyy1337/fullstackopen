const Person = require("./models/person");

const deletePerson = async (id) => {
  const result = await Person.findByIdAndDelete(id);
  return result;
};

const addPerson = async (person) => {
  if (await getPersonByName(person.name))
    throw new Error("Name must be unique");

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

const getPersonByName = async (name) => {
  const person = await Person.findOne({ name: name });
  return person;
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
