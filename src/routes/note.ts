import express from 'express';
import { addNote } from '../controllers/notesAPI.js';
import { userAuth } from '../middlewares/userAuth.middleware.js';

export const noteRouter = express.Router();

noteRouter.post('/add-note', addNote)