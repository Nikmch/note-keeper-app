"use client";
import { NoteClass } from "../../models/Notes";
import { useState } from "react";
import Button from "./savebtn";

interface EditNoteProps {
  note: NoteClass;
}

const EditNote: React.FC<EditNoteProps> = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);
  const [newContent, setNewContent] = useState(note.content);

  const handleClick = () => {
    setIsEditing(true);
    console.log(note);
  };
  // const editing = () => {
  //     setIsEditing(false);
  // }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(e.target.value);
  };

  return (
    <div onClick={handleClick}>
      {isEditing ? (
        <div className="edit-note" id="id">
          <input
            className="edit-note"
            type="text"
            name="title"
            value={newTitle}
            onChange={handleTitleChange}
          />
          <textarea
            className="edit-note"
            name="content"
            value={newContent}
            onChange={handleContentChange}
          />
          <Button
            note={note}
            newTitle={newTitle}
            newContent={newContent}
            handleEdit={setIsEditing}
          />
        </div>
      ) : (
        <div>
          <h1>{note.title}</h1>
          <p>{note.content}</p>
        </div>
      )}
    </div>
  );
};

export default EditNote;
