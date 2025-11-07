import type { Response, Request } from "express";
import { noteValidation } from "../utils/noteValidation.js";
import { Note } from "../model/NoteModal.js";

export const addNote = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { title, description, isFavourite } = req.body;

    if (!user) {
      throw new Error("Please LogIn first.");
    }

    noteValidation(title, description);

    const newNote = new Note({
      userId: user?._id,
      title,
      description,
      isFavourite,
    });

    await newNote.save();

    res.status(201).json({
      success: true,
      message: "Note Added Successfully!",
      data: newNote,
    });
  } catch (err) {
    res.status(400).json({
      message:
        err instanceof Error ? err.message : "Error while adding the note.",
    });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Please LogIn first.");
    }

    const allNotes = await Note.find({ userId: user._id });
    if (!allNotes || allNotes.length === 0) {
      res.status(200).json({ message: "No Note found" });
    }

    res.status(200).json({
      success: true,
      message: "Notes Found.",
      data: allNotes,
    });
  } catch (err) {
    res.status(400).json({
      message:
        err instanceof Error ? err.message : "Error while getting notes.",
    });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const noteToDelete = await Note.findByIdAndDelete(id);
    if (!noteToDelete) {
      throw new Error("No Note Found of this Id.");
    }

    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully!" });
  } catch (err) {
    res.status(400).json({
      message:
        err instanceof Error ? err.message : "Error while deleting note.",
    });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const { title, description, isFavourite } = req.body;

    if (!user) {
      throw new Error("Please LogIn first.");
    }

    if (!id) {
      throw new Error("Note ID is required.");
    }

    const noteToUpdate = await Note.findOne({ _id: id, userId: user._id });
    if (!noteToUpdate) {
      throw new Error("Note not found.");
    }

    if (title !== undefined) noteToUpdate.title = title;
    if (description !== undefined) noteToUpdate.description = description;
    if (isFavourite !== undefined) noteToUpdate.isFavourite = isFavourite;

    await noteToUpdate.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Note updated successfully!",
        data: noteToUpdate,
      });
  } catch (err) {
    res.status(400).json({
      message:
        err instanceof Error ? err.message : "Error while deleting note.",
    });
  }
};
