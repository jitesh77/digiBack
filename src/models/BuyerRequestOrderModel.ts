import mongoose from "mongoose";
export type RequestOrderModel = mongoose.Document & {
  title: string;
  description: string;
  duration: number;
  senderId: any;
  senderFname: string;
  senderUserName: string;
  status: number; // 0- inactive, 1- for active
  jobId: any;
  authorId: any;
  authorFname: string;
  authorUserName: string;
  jobTitle: string;
  completedAuthor: boolean;
  completedSender: boolean;
  disputedAuthor: boolean;
  disputedSender: boolean;
};

const requestOrderSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: Number,
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  senderFname: String,
  senderUserName: String,
  status: Number, // 0- inactive, 1- for active
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "BuyerRequest" },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  authorFname: String,
  authorUserName: String,
  jobTitle: String,
  completedAuthor: Boolean,
  completedSender: Boolean,
  disputedAuthor: Boolean,
  disputedSender: Boolean
});

const RequestOrder = mongoose.model("RequestOrder", requestOrderSchema);
export default RequestOrder;
