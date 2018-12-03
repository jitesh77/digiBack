"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messagesSchema = new mongoose_1.default.Schema({
    user1: String,
    user2: String,
    pic1: String,
    pic2: String,
    room: String,
    messages: Array
}, { timestamps: true });
exports.Message = mongoose_1.default.model("Message", messagesSchema);
const messagesListSchema = new mongoose_1.default.Schema({
    pOne: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    pTwo: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    pOneFname: String,
    pTwoFname: String,
    pOneImage: String,
    pTwoImage: String,
    lastMessage: String,
    room: String
}, { timestamps: true });
exports.MessagesList = mongoose_1.default.model("MessageList", messagesListSchema);
//# sourceMappingURL=Messages.js.map