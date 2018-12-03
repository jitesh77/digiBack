"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const hourlySchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    rate: Number,
    tags: Array,
    duration: Number,
    authorId: String,
    authorFname: String,
    authorUserName: String,
    file: String,
    category: Object,
    subCategory: Object,
    purchases: Number,
    queue: Number,
    brDescription: String,
    authorProfilePicture: String,
    rating: Number,
    ratingCount: Number,
    status: Number // 0- inactive, 1- for active
}, { timestamps: true });
const Hourly = mongoose_1.default.model("Hourly", hourlySchema);
exports.default = Hourly;
//# sourceMappingURL=Hourly.js.map