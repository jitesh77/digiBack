import mongoose from "mongoose";

export type PortfolioModel = mongoose.Document & {
  title: string;
  description: string;
  brDescription: string;
  tags: Array<any>;
  date: any;
  authorId: string;
  authorFname: string;
  authorUserName: string;
  file: string;
  category: any;
  subCategory: object;
  links: string;
  status: number; // 0- inactive, 1- for active
};

const portfolioSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    brDescription: String,
    tags: Array,
    date: Date,
    authorId: String,
    authorFname: String,
    authorUserName: String,
    file: String,
    category: Object,
    subCategory: Object,
    links: String,
    status: Number // 0- inactive, 1- for active
  },
  { timestamps: true }
);
const Portfolio = mongoose.model("Portfolio", portfolioSchema);
export default Portfolio;
