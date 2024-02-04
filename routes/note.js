const express = require('express');
const router = express.Router();
const Note = require("../controllers/note");

router.get("/", Note.getNotes);
router.get("/:id", Note.getNote);
router.post("/", Note.createNote);
router.post("/:id", Note.updateNote);
router.delete("/:id", Note.deleteNote);

module.exports = router;