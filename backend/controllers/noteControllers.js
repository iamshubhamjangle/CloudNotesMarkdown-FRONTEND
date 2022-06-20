const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

/**
 * Get All Notes for a particular user._id (token)
 */
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

/**
 * Get Note by id
 */
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note || note.user.toString() !== req.user._id.toString()) {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});

/**
 * Create Note with given data and user._id (token)
 */
const CreateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
  }

  const note = new Note({ user: req.user._id, title, content, category });
  const createdNote = await note.save();
  res.status(201).json(createdNote);
});

/**
 * Update Note
 */
const UpdateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const note = await Note.findById(req.params.id);

  if (!note || note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  note.title = title;
  note.content = content;
  note.category = category;

  const updatedNote = await note.save();
  res.json(updatedNote);
});

/**
 * Delete Note
 */
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  // If note doesnt exist or user has not created the note
  if (!note || note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  await note.remove();
  res.json({ message: "Note Removed" });
});

module.exports = {
  getAllNotes,
  getNoteById,
  CreateNote,
  UpdateNote,
  deleteNote,
};
