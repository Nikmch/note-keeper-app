import { useState } from "react";
import { UpdateNoteAction } from "../../app/_action";
import { NoteClass } from "../../models/Notes";
import { useRouter } from "next/navigation";

interface UpdateNoteButtonProps {
  note: NoteClass;
  newTitle: string;
  newContent: string;
  handleEdit: (params: any) => any;
}

const Button: React.FC<UpdateNoteButtonProps> = ({
  note,
  newTitle,
  newContent,
  handleEdit,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const handleEdit = () => {
  //   setIsEditing(false);
  // }

  const handleUpdateNote = async () => {
    try {
      setLoading(true);

      // Make a POST request to the API route to update the note

      await UpdateNoteAction(
        note.id,
        {
          title: newTitle, // Provide the updated title
          content: newContent,
        },
        "/with-server-actions"
      );

      console.log("Note updated successfully");
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      setLoading(false);
      handleEdit(false);
      router.push("/");
    }
  };

  return (
    <>
      <button
        onClick={handleUpdateNote}
        disabled={loading}
        className="update-btn"
      >
        {loading ? "Updating..." : "Update Note"}
      </button>
    </>
  );
};

export default Button;
