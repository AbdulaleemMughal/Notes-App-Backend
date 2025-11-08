import express from 'express';
import { addNote, deleteNote, getNote, getSingleNote, updateNote } from '../controllers/notesAPI.js';
import { userAuth } from '../middlewares/userAuth.middleware.js';

export const noteRouter = express.Router();

noteRouter.post('/add-note', userAuth, addNote);
noteRouter.get('/get-note', userAuth, getNote);
noteRouter.patch('/update-note/:id', userAuth, updateNote);
noteRouter.delete('/delete-note/:id', userAuth, deleteNote);
noteRouter.get('/get-single-note/:id', userAuth, getSingleNote);