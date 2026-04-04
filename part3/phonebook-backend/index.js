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

  if (!name) return res.status(400).send({ error: "name must be specified" });
  if (!number)
    return res.status(400).send({ error: "number must be specified" });

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

  if (err.name === "CastError")
    return res.status(400).send({ error: "malformatted id" });

  next(err);
});

app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`App listening on port ${PORT}`);
});
