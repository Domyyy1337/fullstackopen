const express = require("express");
const data = require("./data.js");

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("PhoneBook API");
});

app.get("/info", (req, res) => {
  const size = data.getPhoneBook().length;
  res.send(
    `Phonebook has info for ${size} people\n${new Date().toUTCString()}`,
  );
});

app.get("/api/persons", (req, res) => {
  res.json(data.getPhoneBook());
});

app.post("/api/persons", (req, res) => {
  const entry = req.body;

  const id = String(Math.floor(Math.random() * 100000000));
  const person = {
    id: id,
    name: entry.name,
    number: entry.number,
  };
  data.addPerson(person);
  const addedPerson = data.getPersonById(id);
  res.json(addedPerson);
});

app.get("/api/persons/:personId", (req, res) => {
  const { personId } = req.params;
  const entry = data.getPersonById(personId);

  if (!entry) {
    return res.sendStatus(404);
  }

  res.json(entry);
});

app.delete("/api/persons/:personId", (req, res) => {
  const { personId } = req.params;

  if (data.deletePerson(personId)) {
    return res.json(data.getPhoneBook());
  }

  res.sendStatus(404);
});

app.listen(3001, (error) => {
  if (error) throw error;

  console.log("App listening on port 3001");
});
