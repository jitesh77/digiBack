"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const microjobSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    brDescription: String,
    price: Number,
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
    authorProfilePicture: String,
    rating: Number,
    ratingCount: Number,
    status: Number // 0- inactive, 1- for active
}, { timestamps: true });
const Microjob = mongoose_1.default.model("Microjob", microjobSchema);
exports.default = Microjob;
//# sourceMappingURL=Microjobs.js.map