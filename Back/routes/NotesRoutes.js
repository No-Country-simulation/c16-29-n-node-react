import { Router } from "express";
import { verifyToken } from '../src/middlewares/auth.js';
import { createNotes, deleteNotes, getAllNotes, getNotes, updateNotes } from "../src/controllers/NotesController.js";

const notesRouter = Router()

notesRouter.get('/', verifyToken, getAllNotes)
notesRouter.get('/:id', verifyToken, getNotes)
notesRouter.post('/', verifyToken, createNotes)
notesRouter.put('/:id', verifyToken, updateNotes)
notesRouter.delete('/:id', verifyToken, deleteNotes)

export default notesRouter