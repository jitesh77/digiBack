"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const acceptedMicrojobOrderSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    duration: Number,
    senderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    senderFname: String,
    senderUserName: String,
    status: Number,
    jobId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Microjob" },
    orderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "MicrojobOrder" },
    authorId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
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
exports.AcceptedMicrojobOrder = mongoose_1.default.model("AcceptedMicrojobOrder", acceptedMicrojobOrderSchema);
const acceptedHourlyOrderSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    duration: Number,
    senderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    senderFname: String,
    senderUserName: String,
    status: Number,
    jobId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Hourly" },
    orderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "HourlyOrder" },
    authorId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
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
exports.AcceptedHourlyOrder = mongoose_1.default.model("AcceptedHourlyOrder", acceptedHourlyOrderSchema);
const acceptedRequestOrderSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    duration: Number,
    senderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    senderFname: String,
    senderUserName: String,
    status: Number,
    jobId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "BuyerRequest" },
    orderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "RequestOrder" },
    authorId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
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
exports.AcceptedRequestOrder = mongoose_1.default.model("AcceptedRequestOrder", acceptedRequestOrderSchema);
// export default RequestOrder;
//# sourceMappingURL=AcceptedOrder.js.map