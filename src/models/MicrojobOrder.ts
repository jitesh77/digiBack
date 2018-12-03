import mongoose from "mongoose";
export type MicrojobOrderModel = mongoose.Document & {
  title: string;
  description: string;
  duration: number;
  senderId: any;
  senderFname: string;
  senderUserName: string;
  authorFname: string;
  status: number; // 0- inactive, 1- for active
  jobId: any;
  authorId: any;
  authorUserName: string;
  jobTitle: string;
  completedAuthor: boolean;
  completedSender: boolean;
  disputedAuthor: boolean;
  disputedSender: boolean;
};

const microjobOrderSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: Number,
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  senderFname: String,
  senderUserName: String,
  authorFname: String,
  status: Number, // 0- inactive, 1- for active
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Microjob" },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  authorUserName: String,
  jobTitle: String,
  completedAuthor: Boolean,
  completedSender: Boolean,
  disputedAuthor: Boolean,
  disputedSender: Boolean
});

const MicrojobOrder = mongoose.model("MicrojobOrder", microjobOrderSchema);
export default MicrojobOrder;
