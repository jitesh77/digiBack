"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subCategorySchema = new mongoose_1.default.Schema({
    name: String,
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "SubCategories" }
});
const SubCategory = mongoose_1.default.model("SubCategory", subCategorySchema);
exports.default = SubCategory;
//# sourceMappingURL=SubCategory.js.map