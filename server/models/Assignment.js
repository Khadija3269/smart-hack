import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
  hackathonId: { type: String, required: true, unique: true },
  judgeEmail: { type: String, lowercase: true },
}, { timestamps: true });

export default mongoose.model("Assignment", AssignmentSchema);
