"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const skillSchema = new mongoose_1.default.Schema({
    name: String
});
const Skill = mongoose_1.default.model("Skill", skillSchema);
exports.default = Skill;
//# sourceMappingURL=Skill.js.map