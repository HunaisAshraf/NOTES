import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { addNotes, deleteNote, getNotes } from "../controller/notesController";
const router = express.Router();

router.get("/get-notes", isAuthenticated, getNotes);
router.post("/add-note", isAuthenticated, addNotes);
router.delete("/delete-note/:noteid", isAuthenticated, deleteNote);

export default router;
