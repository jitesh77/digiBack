import mongoose from "mongoose";

export type CategoryModel = mongoose.Document & {
  name: string;
  description: string;
};

const categorySchema = new mongoose.Schema({
  name: String,
  description: String
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
