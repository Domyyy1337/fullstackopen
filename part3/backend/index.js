require("dotenv").config();
const express = require("express");
const Note = require("./models/note.js");

const app = express();

const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.static("dist"));

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

app.get("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  res.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

app.post("/api/notes", async (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save();

  res.json(savedNote);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
