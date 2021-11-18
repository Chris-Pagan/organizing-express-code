const notes = require("../data/notes-data");

//Validation functions
function noteExists(req, res, next) {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote) {
    return next();
  } else {
    return next({
      status: 404,
      message: `Note id not found: ${req.params.noteId}`,
    });
  }
}

function hasText(req, res, next) {
  const { data: { text } = {} } = req.body;
  if (text) {
    return next();
  }
  return next({ status: 400, message: "A 'text' property is required." });
}

//Get request
function list(req, res) {
  res.json({ data: notes });
}

//Create request
function create(req, res) {
  const { data: { text } = {} } = req.body;
  const newNote = {
    id: notes.length + 1, // Assign the next ID
    text,
  };
  notes.push(newNote);
  res.status(201).json({ data: newNote });
}

//Read request
function read(req, res) {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  res.json({ data: foundNote });
}

//PUT request
function update(req, res) {
    const { noteId } = req.params;
  const { data: { text } = {} } = req.body;
  const foundNote = notes.find((note) => note.id === Number(noteId));
  const originalResult = foundNote.text;
  if (originalResult !== text) {
    foundNote.text = text;
  }
  res.json({ data: foundNote });
}
//Delete
function destroy(req, res) {
  const { noteId } = req.params;
  const index = notes.findIndex((note) => note.id === Number(noteId));
  const deletedNote = notes.splice(index, 1);
  res.sendStatus(204);
}

module.exports = {
  create: [hasText, create],
  read: [noteExists, read],
  update: [noteExists, hasText, update],
  delete: [noteExists, destroy],
  list,
};
