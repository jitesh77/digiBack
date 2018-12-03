"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const buyerRequestSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    brDescription: String,
    budget: Number,
    category: Object,
    subCategory: Object,
    tags: Array,
    // tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    duration: Number,
    authorId: String,
    authorFname: String,
    authorUserName: String,
    authorProfilePicture: String,
    rating: Number,
    ratingCount: Number,
    // author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: Number // 0- inactive, 1- for active
}, { timestamps: true });
const BuyerRequest = mongoose_1.default.model("BuyerRequest", buyerRequestSchema);
exports.default = BuyerRequest;
//# sourceMappingURL=BuyerRequest.js.map