import mongoose from "mongoose";
export type BuyerRequestModel = mongoose.Document & {
  title: string;
  description: string;
  brDescription: string;
  budget: any;
  tags: Array<any>;
  category: object;
  subCategory: object;
  duration: any;
  authorId: string;
  authorFname: string;
  authorUserName: string;
  authorProfilePicture: string;
  rating: string;
  ratingCount: number;
  status: any; // 0- inactive, 1- for active
};

const buyerRequestSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    brDescription: String,
    budget: Number,
    category: Object,
    subCategory: Object,
    tags: Array,
    // tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    duration: Number,
    authorId: String,
    authorFname: String,
    authorUserName: String,
    authorProfilePicture: String,
    rating: Number,
    ratingCount: Number,
    // author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: Number // 0- inactive, 1- for active
  },
  { timestamps: true }
);

const BuyerRequest = mongoose.model("BuyerRequest", buyerRequestSchema);
export default BuyerRequest;
