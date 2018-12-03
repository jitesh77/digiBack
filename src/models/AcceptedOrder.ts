import mongoose from "mongoose";
export type AcceptedMicrojobOrderModel = mongoose.Document & {
  title: string;
  description: string;
  duration: number;
  senderId: any;
  senderFname: string;
  senderUserName: string;
  status: number; // -1 - disputed, 2- for active, 3- completed, 4- PaymentCompleted
  jobId: any;
  orderId: any;
  authorId: any;
  authorUserName: string;
  jobTitle: string;
  completedAuthor: boolean;
  completedSender: boolean;
  disputedAuthor: boolean;
  disputedSender: boolean;
  sellerPubAddress: string;
  EscrowAmount: number;
  EscrowTxId: string;
  RedeemScript: string;
  type: string;
  dealStatus: string;
  PaymentSignature1: string;
  address: string;
  mediated: boolean;
  mediatedPercentage: number;
};

const acceptedMicrojobOrderSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: Number,
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  senderFname: String,
  senderUserName: String,
  status: Number, // -1 - disputed, 2- for active, 3- completed 4- PaymentCompleted
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Microjob" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "MicrojobOrder" },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  jobTitle: String,
  authorUserName: String,
  completedAuthor: Boolean,
  completedSender: Boolean,
  disputedAuthor: Boolean,
  disputedSender: Boolean,
  address: String,
  sellerPubAddress: String,
  EscrowAmount: Number,
  EscrowTxId: String,
  RedeemScript: String,
  dealStatus: String,
  PaymentSignature1: String,
  type: { type: String, default: "microjob" },
  escrow: { type: Boolean, default: false },
  mediated: Boolean,
  mediatedPercentage: Number
});

export let AcceptedMicrojobOrder = mongoose.model(
  "AcceptedMicrojobOrder",
  acceptedMicrojobOrderSchema
);
// export default AcceptedOrder;

export type AcceptedHourlyOrderModel = mongoose.Document & {
  title: string;
  description: string;
  duration: number;
  senderId: any;
  senderFname: string;
  senderUserName: string;
  status: number; // -1 - disputed, 2- for active, 3- completed 4- PaymentCompleted
  jobId: any;
  orderId: any;
  authorId: any;
  authorUserName: string;
  jobTitle: string;
  completedAuthor: boolean;
  completedSender: boolean;
  disputedAuthor: boolean;
  disputedSender: boolean;
  EscrowAmount: number;
  EscrowTxId: string;
  RedeemScript: string;
  address: string;
  dealStatus: string;
  PaymentSignature1: string;
  type: string;
  mediated: boolean;
  mediatedPercentage: number;
};

const acceptedHourlyOrderSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: Number,
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  senderFname: String,
  senderUserName: String,
  status: Number, // -1 - disputed, 2- for active, 3- completed 4- PaymentCompleted
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Hourly" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "HourlyOrder" },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  authorUserName: String,
  jobTitle: String,
  completedAuthor: Boolean,
  completedSender: Boolean,
  disputedAuthor: Boolean,
  disputedSender: Boolean,
  address: String,
  sellerPubAddress: String,
  EscrowAmount: Number,
  EscrowTxId: String,
  RedeemScript: String,
  dealStatus: String,
  PaymentSignature1: String,
  type: { type: String, default: "hourly" },
  escrow: { type: Boolean, default: false },
  mediated: Boolean,
  mediatedPercentage: Number
});

export let AcceptedHourlyOrder = mongoose.model(
  "AcceptedHourlyOrder",
  acceptedHourlyOrderSchema
);
//   export default HourlyOrder;

export type AcceptedRequestOrderModel = mongoose.Document & {
  title: string;
  description: string;
  duration: number;
  senderId: any;
  senderFname: string;
  senderUserName: string;
  status: number; // -1 - disputed, 2- for active, 3- completed 4- PaymentCompleted
  jobId: any;
  orderId: any;
  authorId: any;
  authorUserName: string;
  jobTitle: string;
  completedAuthor: boolean;
  completedSender: boolean;
  disputedAuthor: boolean;
  disputedSender: boolean;
  EscrowAmount: number;
  EscrowTxId: string;
  RedeemScript: string;
  address: string;
  dealStatus: string;
  PaymentSignature1: string;
  type: string;
  mediated: boolean;
  mediatedPercentage: number;
};

const acceptedRequestOrderSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: Number,
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  senderFname: String,
  senderUserName: String,
  status: Number, // -1 - disputed, 2- for active, 3- completed 4- PaymentCompleted
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "BuyerRequest" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "RequestOrder" },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  jobTitle: String,
  authorUserName: String,
  completedAuthor: Boolean,
  completedSender: Boolean,
  disputedAuthor: Boolean,
  disputedSender: Boolean,
  address: String,
  sellerPubAddress: String,
  EscrowAmount: Number,
  EscrowTxId: String,
  RedeemScript: String,
  dealStatus: String,
  PaymentSignature1: String,
  type: { type: String, default: "buyerRequest" },
  escrow: { type: Boolean, default: false },
  mediated: Boolean,
  mediatedPercentage: Number
});

export let AcceptedRequestOrder = mongoose.model(
  "AcceptedRequestOrder",
  acceptedRequestOrderSchema
);
// export default RequestOrder;
