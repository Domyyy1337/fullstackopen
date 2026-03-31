const express = require("express");
const data = require("./data.js");

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("PhoneBook API");
});

app.get("/info", (req, res) => {
  const size = data.phoneBook.length;
  res.send(
    `Phonebook has info for ${size} people\n${new Date().toUTCString()}`,
  );
});

app.get("/api/persons", (req, res) => {
  res.json(data.phoneBook);
});

app.get("/api/persons/:personId", (req, res) => {
  const { personId } = req.params;
  const entry = data.phoneBook.find((entry) => entry.id === personId);

  if (!entry) {
    return res.sendStatus(404);
  }

  res.json(entry);
});

app.listen(3001, (error) => {
  if (error) throw error;

  console.log("App listening on port 3001");
});
