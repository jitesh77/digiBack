"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const portfolioSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    brDescription: String,
    tags: Array,
    date: Date,
    authorId: String,
    authorFname: String,
    authorUserName: String,
    file: String,
    category: Object,
    subCategory: Object,
    links: String,
    status: Number // 0- inactive, 1- for active
}, { timestamps: true });
const Portfolio = mongoose_1.default.model("Portfolio", portfolioSchema);
exports.default = Portfolio;
//# sourceMappingURL=Portfolio.js.map