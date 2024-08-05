import { Response } from "express";
import { IRequestWithUser } from "../utils/type";
import { NotesModel } from "../model/notesModel";

export const getNotes = async (req: IRequestWithUser, res: Response) => {
  try {
    const { id } = req.user!;

    const notes = await NotesModel.find({ user: id });

    return res
      .status(200)
      .json({ success: true, message: "notes retrieved successfully", notes });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "failed to retrieve notes" });
  }
};

export const addNotes = async (req: IRequestWithUser, res: Response) => {
  try {
    const { id } = req.user!;
    const { note } = req.body;
    console.log(note, id);

    const newnote = new NotesModel({ user: id, note });
    await newnote.save();

    return res.status(200).json({
      success: true,
      message: "notes added successfully",
      newnote,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "failed to add notes" });
  }
};

export const deleteNote = async (req: IRequestWithUser, res: Response) => {
  try {
    const { noteid } = req.params;
    const { id } = req.user!;

    const note = await NotesModel.findOne({ _id: noteid, user: id });

    if (!note) {
      throw new Error("not found");
    }

    await NotesModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "notes deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "failed to delete notes" });
  }
};
