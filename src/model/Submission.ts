import mongoose, { Schema, Document } from "mongoose";

export interface ISubmission extends Document {
  contestId: mongoose.Types.ObjectId;
  participantName: string;
  participantEmail: string;
  repoUrl: string;
  liveUrl?: string;
  notes?: string;
  aiScore: number;
  aiFeedback: string;
  status: "Pending" | "Evaluated" | "Rejected";
  createdAt: Date;
}

const SubmissionSchema: Schema = new Schema(
  {
    contestId: { type: Schema.Types.ObjectId, ref: "Contest", required: true },
    participantName: { type: String, required: true },
    participantEmail: { type: String, required: true },
    repoUrl: { type: String, required: true },
    liveUrl: { type: String },
    notes: { type: String },
    aiScore: { type: Number, default: 0 },
    aiFeedback: { type: String, default: "" },
    status: { type: String, enum: ["Pending", "Evaluated", "Rejected"], default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Submission || mongoose.model<ISubmission>("Submission", SubmissionSchema);