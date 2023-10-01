"use server";

import { createNote, deleteNote, UpdateNote } from "../libs/note-db";
import { revalidatePath } from "next/cache";

/**
 * Server Action: Create a new todo.
 */
export async function createNoteAction({
  title,
  content,
  path,
}: {
  title: string;
  content: string;
  path: string;
}) {
  await createNote(title, content);
  revalidatePath(path);
}

/**
 * Server Action: Update an existing note.
 */
export async function UpdateNoteAction(
  //   {id,
  // update,
  // path
  // }: {

  id: string,
  update: { title?: string; content?: string },
  path: string
  // }
) {
  await UpdateNote(id, update);
  revalidatePath(path);
}

/**
 * Server Action: Delete a note.
 */
export async function deleteNoteAction({
  id,
  path,
}: {
  id: string;
  path: string;
}) {
  await deleteNote(id);
  revalidatePath(path);
}
