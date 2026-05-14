import mongoose from "mongoose";

const EvaluationSchema = new mongoose.Schema({
  submissionId: { type: String, required: true },
  judgeEmail: { type: String, required: true, lowercase: true },
  innovation: Number,
  design: Number,
  functionality: Number,
  feedback: String,
}, { timestamps: true });

export default mongoose.model("Evaluation", EvaluationSchema);
