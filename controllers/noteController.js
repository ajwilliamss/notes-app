const Note = require("../models/noteModel");

// @desc    Get notes
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add note
// @route   POST /api/notes
// @access  Private
const addNote = async (req, res) => {
  try {
    const { title, text, date } = req.body;

    // Check fields
    if (!title || !text || !date) {
      return res
        .status(400)
        .json({ message: "Please add a title, text, and date" });
    }

    // Add note
    const note = await Note.create({
      user: req.user.id,
      title,
      text,
      date,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user note
// @route   GET /api/notes/:id
// @access  Private
const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    // Check for note
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check for user
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if logged in user matches note user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
  try {
    const { title, text, date } = req.body;

    const note = await Note.findById(req.params.id);

    // Check for note
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check for user
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if logged in user matches note user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    // Check fields
    if (!title || !text || !date) {
      return res
        .status(400)
        .json({ message: "Please add a title, text, and date" });
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user note
// @route   DELETE /api/goals/:id
// @access  Private
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    // Check for note
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check for user
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the logged in user matches note user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotes, addNote, getNote, updateNote, deleteNote };
