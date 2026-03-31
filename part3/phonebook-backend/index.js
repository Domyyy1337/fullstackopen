const express = require("express");
const data = require("./data.js");

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Phonebook API");
});

app.get("/api/persons", (req, res) => {
  res.json(data.phonebook);
});

app.get("/info", (req, res) => {
  const size = data.phonebook.length;
  res.send(
    `Phonebook has info for ${size} people\n${new Date().toUTCString()}`,
  );
});

app.listen(3001, (error) => {
  if (error) throw error;

  console.log("App listening on port 3001");
});
