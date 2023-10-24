import AddIcon from "@mui/icons-material/Add";

import { createNoteAction } from "../_action";

export default async function CreateArea() {
  async function action(data: FormData) {
    "use server";

    const title = data.get("title");
    if (!title || typeof title !== "string") {
      return;
    }
    const content = data.get("content");
    if (!content || typeof content !== "string") {
      return;
    }

    await createNoteAction({ title, content, path: "/" });
  }

  return (
    <div >
      <form action={action} key={Math.random()} className="create-note">
        <input key="index" type="text" name="title" placeholder="Title" />

        <textarea name="content" placeholder="Take a note..." />

        <button>
          <AddIcon />
        </button>
      </form>
    </div>
  );
}
