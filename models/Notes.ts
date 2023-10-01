import {
  ModelOptions,
  Severity,
  getModelForClass,
  index,
  post,
  prop,
} from "@typegoose/typegoose";
import mongoose from "mongoose";

@post<NoteClass>("save", function (doc) {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<NoteClass[]>(/^find/, function (docs) {
  // @ts-ignore
  if (this.op === "find") {
    docs.forEach((doc) => {
      doc.id = doc._id.toString();
      doc._id = doc.id;
    });
  }
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "notes",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ title: 1 })
class NoteClass {
  @prop()
  title: string;

  @prop()
  content: string;

  @prop()
  newTitle: string;

  @prop()
  newContent: string;

  id: string;

  _id: mongoose.Types.ObjectId | string;
}

const Note = getModelForClass(NoteClass);
export { Note, NoteClass };
