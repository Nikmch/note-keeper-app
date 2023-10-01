import { Note } from "../models/Notes";
import connectDB from "./connect-db";
import { stringToObjectId } from "./utils";

interface NoteFilter {
  page?: number;
  limit?: number;
}

export async function getNotes(filter: NoteFilter = {}) {
  try {
    await connectDB();

    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    const notes = await Note.find().skip(skip).limit(limit).lean().exec();

    const results = notes.length;

    return {
      notes: notes,
      page,
      limit,
      results,
    };
  } catch (error) {
    return { error };
  }
}

export async function createNote(title: string, content: string) {
  try {
    await connectDB();

    const note = await Note.create({ title, content });

    return {
      note,
    };
  } catch (error) {
    return { error };
  }
}

export async function getNote(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Note not found" };
    }

    const note = await Note.findById(parsedId).lean().exec();
    if (note) {
      return {
        note,
      };
    } else {
      return { error: "Note not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function UpdateNote(
  id: string,
  { title, content }: { title?: string; content?: string }
) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Note not found" };
    }

    const note = await Note.findByIdAndUpdate(
      parsedId,
      { title, content },
      { new: true }
    )
      .lean()
      .exec();
    console.log(note);
    if (!note) {
      return;
      {
        error: "Note not found";
      }
    } else {
      return { note };
    }
  } catch (error) {
    return { error };
  }
}

export async function deleteNote(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Note not found" };
    }

    const note = await Note.findByIdAndDelete(parsedId).exec();

    if (note) {
      return {};
    } else {
      return { error: "Note not found" };
    }
  } catch (error) {
    return { error };
  }
}
