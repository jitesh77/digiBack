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
    status: Number,
    microjobId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Microjob" },
    authorId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }
});
const MicrojobOrder = mongoose_1.default.model("MicrojobOrder", microjobOrderSchema);
exports.default = MicrojobOrder;
//# sourceMappingURL=Order.js.map