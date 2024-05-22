const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1 : get all the Notes using : GET : /api/notes/fetchuser - Login Required
// header -> auentication token -> user id
// res -> all notes associated with the user 

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// ROUTE 2 : add a new note using : POST : /api/notes/addnote - Login Required
// headers -> authentication token 
// body -> title , desc , [tag] , [date]
// res -> created note

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if the validation is failed return errors
    const { title, description, tag, date } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("first valiadtion failed");
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = new Notes({ title, description, tag, user: req.user.id });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
);

// ROUTE 3 : Update a exising note using : PUT : /api/notes/updatenote/:id - Login Required
// params -> note id 
// header -> authentication token -> user id
// body -> [title] , [desc] , [tag]
// res -> updated note

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // create a new note object
  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;

  // find the note to be updated and update it
  const note = await Notes.findById(req.params.id);

  // if note id is not found
  if (!note) {
    return res.status(400).send("the note id you entered is not found");
  }

  // if note user id is not equal to id of note in database
  if (req.user.id != note.user.toString()) {
    return res.status(400).send("your user id is wrond");
  }

  const updatedNote = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json(updatedNote);
});

// ROUTE 4 : delete a exising note using : DELEaTE : /api/notes/deltenote/:id - Login Required
// params -> id
// header -> authentication token
// res -> deleted note

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // find the note to be delted
  const note = await Notes.findById(req.params.id);

  // if note id is not found
  if (!note) {
    return res.status(400).send("the note id you entered is not found");
  }

  // if note user id is not equal to id of note in database -> it is deleted by another user
  if (req.user.id != note.user.toString()) {
    return res.status(400).send("your user id is wrond");
  }

  const deletedNote = await Notes.findByIdAndDelete(req.params.id);

  res.json({ SUCCESS: "note is deleted", note: deletedNote });
});

module.exports = router;
