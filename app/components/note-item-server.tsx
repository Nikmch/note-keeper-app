import { deleteNoteAction } from "../../app/_action";
import DeleteIcon from "@mui/icons-material/Delete";
import { NoteClass } from "../../models/Notes";
import EditNote from "../components/edit-note";

interface NoteItemProps {
  note: NoteClass;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  return (
    <form className="flex items-center space-x-2 mb-2" key={note.id}>
      <div className="note">
        <div>
          <div>
            <EditNote key={note.id} note={note} />
          </div>

          <button
            formAction={async () => {
              "use server";
              await deleteNoteAction({
                id: note.id,
                path: "/",
              });
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </form>
  );
};
export default NoteItem;
