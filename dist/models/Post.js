"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    _id: String,
    title: String,
    description: String,
    price: Number,
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Tag" }],
    duration: Number,
    author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    images: [],
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category" },
    purchases: Number,
    status: Number // 0- inactive, 1- for active
});
const Post = mongoose_1.default.model("Post", postSchema);
exports.default = Post;
//# sourceMappingURL=Post.js.map