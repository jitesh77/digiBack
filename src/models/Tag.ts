import mongoose from "mongoose";

export type TagModel = mongoose.Document & {
  name: string;
};

const tagSchema = new mongoose.Schema({
  name: String
});

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
