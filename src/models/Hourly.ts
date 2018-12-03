import mongoose from "mongoose";
export type HourlyModel = mongoose.Document & {
  title: string;
  description: string;
  rate: number;
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

const hourlySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    rate: Number,
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
    brDescription: String,
    authorProfilePicture: String,
    rating: Number,
    ratingCount: Number,
    status: Number // 0- inactive, 1- for active
  },
  { timestamps: true }
);

const Hourly = mongoose.model("Hourly", hourlySchema);
export default Hourly;
