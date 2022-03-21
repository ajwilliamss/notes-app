const express = require("express");
const router = express.Router();
const {
  getNotes,
  addNote,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const { auth } = require("../middleware/authMiddleware");

router.route("/").get(auth, getNotes).post(auth, addNote);
router
  .route("/:id")
  .get(auth, getNote)
  .put(auth, updateNote)
  .delete(auth, deleteNote);

module.exports = router;
