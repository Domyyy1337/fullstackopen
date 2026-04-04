require("dotenv").config();
const express = require("express");
const data = require("./data.js");
const morgan = require("morgan");

const app = express();
const PORT = process.env.port || 3001;

morgan.token("type", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :type"),
);

app.get("/api", (req, res) => {
  res.send("PhoneBook API");
});

app.get("/info", (req, res) => {
  const size = data.getPhoneBook().length;
  res.send(
    `Phonebook has info for ${size} people\n${new Date().toUTCString()}`,
  );
});

app.get("/api/persons", async (req, res) => {
  res.json(await data.getPhoneBook());
});

app.post("/api/persons", async (req, res) => {
  const entry = req.body;
  const person = {
    name: entry.name,
    number: entry.number,
  };
  const addPerson = await data.addPerson(person);

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
  const deletedPerson = data.deletePerson(personId);

  if (deletedPerson) {
    return res.json(deletedPerson);
  }

  res.sendStatus(404);
});

app.use((req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
});

app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`App listening on port ${PORT}`);
});
