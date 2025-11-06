import type { Response, Request } from "express";
import { noteValidation } from "../utils/noteValidation.js";

export const addNote = async (req: Request, res: Response) => {
  try {
    console.log("HEADERS:", req.headers["content-type"]);
    console.log("BODY RAW:", req.body);

    const { title, note, isFavourite } = req.body;

    res.json({ success: true, received: req.body });
  } catch (err) {
    res.status(400).json({
      message:
        err instanceof Error ? err.message : "Error while adding the note.",
    });
  }
};