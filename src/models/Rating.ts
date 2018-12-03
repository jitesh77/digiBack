import mongoose from "mongoose";

export type RatingModel = mongoose.Document & {
  rating: number;
  type: string; // buyers req , post
  receiverId: any; // mongoose.Schema.Types.ObjectId;
  receiverFname: string;
  senderId: any; // mongoose.Schema.Types.ObjectId;
  senderFname: string;
  jobId: any;
  orderId: any;
  review: string;
  jobAuthorId: any;
  clientReview: boolean;
};

const ratingSchema = new mongoose.Schema(
  {
    rating: Number,
    type: String, // buyers req , post
    receiverFname: String,
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    senderFname: String,
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    jobAuthorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    review: String,
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Microjob" },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "MicrojobOrder" },
    clientReview: Boolean
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;
