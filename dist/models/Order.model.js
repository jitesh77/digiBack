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
    authorId: String,
    authorFname: String,
    authorUserName: String,
    status: Number // 0- inactive, 1- for active
});
const MicrojobOrder = mongoose_1.default.model("MicrojobOrder", microjobOrderSchema);
exports.default = MicrojobOrder;
//# sourceMappingURL=Order.model.js.map