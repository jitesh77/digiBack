import mongoose from "mongoose";

export type SkillModel = mongoose.Document & {
  name: string;
};

const skillSchema = new mongoose.Schema({
  name: String
});

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
