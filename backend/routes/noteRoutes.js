const express = require("express");
const {
  getAllNotes,
  CreateNote,
  getNoteById,
  UpdateNote,
  deleteNote,
} = require("../controllers/noteControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getAllNotes);
router.route("/create").post(protect, CreateNote);
router
  .route("/:id")
  .get(protect, getNoteById)
  .put(protect, UpdateNote)
  .delete(protect, deleteNote);
//     .get()

module.exports = router;
