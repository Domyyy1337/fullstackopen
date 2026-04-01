const express = require("express");
const data = require("./data.js");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("Body: ", req.body);
  console.log("---");
  next();
});
app.use(morgan("tiny"));

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
  const addPerson = data.addPerson(person);

  if (!addPerson.added) {
    return res.status(400).json(addPerson);
  }

  res.status(201).json(addPerson.addedPerson);
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

app.use((req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
});

app.listen(3001, (error) => {
  if (error) throw error;

  console.log("App listening on port 3001");
});
