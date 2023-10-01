import NoteFormServerComponent from "./components/note-form-server";
import NoteItemServerComponent from "./components/note-item-server";
import { getNotes } from "../libs/note-db";

export default async function Home() {
  const { notes, results } = await getNotes();

  return (
    <main>
      <div>
        <NoteFormServerComponent />
        {results === 0 ? (
          <p className="text-center">No Notes Found</p>
        ) : (
          notes?.map((note) => {
            return (
              <div>
                <NoteItemServerComponent key={note.id} note={note} />
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
