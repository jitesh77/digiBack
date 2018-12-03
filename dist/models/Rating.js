"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ratingSchema = new mongoose_1.default.Schema({
    rating: Number,
    type: String,
    receiverFname: String,
    receiverId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    senderFname: String,
    senderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    jobAuthorId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    review: String,
    jobId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Microjob" },
    orderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "MicrojobOrder" },
    clientReview: Boolean
}, { timestamps: true });
const Rating = mongoose_1.default.model("Rating", ratingSchema);
exports.default = Rating;
//# sourceMappingURL=Rating.js.map