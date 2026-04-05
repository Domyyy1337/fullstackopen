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

app.get("/info", async (req, res) => {
  const size = await data.getSize();
  res.send(
    `Phonebook has info for ${size} people\n${new Date().toUTCString()}`,
  );
});

app.get("/api/persons", async (req, res) => {
  res.json(await data.getPhoneBook());
});

app.post("/api/persons", (req, res, next) => {
  const entry = req.body;
  const person = {
    name: entry.name,
    number: entry.number,
  };

  data
    .addPerson(person)
    .then((addedPerson) => res.status(201).json(addedPerson))
    .catch((err) => next(err));
});

app.get("/api/persons/:personId", async (req, res, next) => {
  const { personId } = req.params;

  try {
    const entry = await data.getPersonById(personId);
    res.json(entry);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:personId", async (req, res, next) => {
  const { personId } = req.params;

  try {
    const deletedPerson = await data.deletePerson(personId);

    if (deletedPerson) {
      return res.status(204).send();
    }

    return res.status(404).send({ error: "No person with this ID found" });
  } catch (error) {
    next(error);
  }
});

app.put("/api/persons/:personId", async (req, res, next) => {
  const { personId } = req.params;
  const { name, number } = req.body;

  try {
    const updatedPerson = await data.updatePerson(personId, name, number);
    res.json(updatedPerson);
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
});

app.use((err, req, res, next) => {
  console.error(err.message);

  switch (err.name) {
    case "CastError":
      return res.status(400).send({ error: "malformatted id" });
    case "ValidationError":
      return res.status(400).send({ error: err.message });
    default:
      next(err);
  }
});

app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`App listening on port ${PORT}`);
});
