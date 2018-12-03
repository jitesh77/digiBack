"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const requestOrderSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    duration: Number,
    senderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    senderFname: String,
    senderUserName: String,
    status: Number,
    jobId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "BuyerRequest" },
    authorId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    authorFname: String,
    authorUserName: String,
    jobTitle: String,
    completedAuthor: Boolean,
    completedSender: Boolean,
    disputedAuthor: Boolean,
    disputedSender: Boolean
});
const RequestOrder = mongoose_1.default.model("RequestOrder", requestOrderSchema);
exports.default = RequestOrder;
//# sourceMappingURL=BuyerRequestOrderModel.js.map