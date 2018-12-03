"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const microjobOrderSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    duration: Number,
    senderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    senderFname: String,
    senderUserName: String,
    authorFname: String,
    status: Number,
    jobId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Microjob" },
    authorId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    authorUserName: String,
    jobTitle: String,
    completedAuthor: Boolean,
    completedSender: Boolean,
    disputedAuthor: Boolean,
    disputedSender: Boolean
});
const MicrojobOrder = mongoose_1.default.model("MicrojobOrder", microjobOrderSchema);
exports.default = MicrojobOrder;
//# sourceMappingURL=MicrojobOrder.js.map