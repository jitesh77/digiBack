import mongoose from "mongoose";

export type SubCategoryModel = mongoose.Document & {
  name: string;
  categories: any;
};

const subCategorySchema = new mongoose.Schema({
  name: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategories" }
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export default SubCategory;
