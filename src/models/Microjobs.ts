import mongoose from "mongoose";
export type MicrojobModel = mongoose.Document & {
  title: string;
  description: string;
  price: number;
  tags: Array<any>;
  duration: number;
  authorId: string;
  authorFname: string;
  authorUserName: string;
  file: string;
  category: any;
  subCategory: object;
  purchases: number;
  queue: number;
  brDescription: string;
  authorProfilePicture: string;
  rating: number;
  ratingCount: number;
  status: number; // 0- inactive, 1- for active
};

const microjobSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    brDescription: String,
    price: Number,
    tags: Array,
    duration: Number,
    authorId: String,
    authorFname: String,
    authorUserName: String,
    file: String,
    category: Object,
    subCategory: Object,
    purchases: Number,
    queue: Number,
    authorProfilePicture: String,
    rating: Number,
    ratingCount: Number,
    status: Number // 0- inactive, 1- for active
  },
  { timestamps: true }
);

const Microjob = mongoose.model("Microjob", microjobSchema);
export default Microjob;
