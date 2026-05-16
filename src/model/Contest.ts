import mongoose, { Schema, model, models } from "mongoose";

const ContestSchema = new Schema(
  {
    title: { 
      type: String, 
      required: [true, "Contest title is required"],
      trim: true 
    },
    description: { 
      type: String, 
      required: [true, "Description is required"] 
    },
    banner: { 
      type: String, 
      default: "" 
    },
    category: { 
      type: String, 
      required: [true, "Category is required"] 
    },
    difficulty: { 
      type: String, 
      enum: ["Beginner", "Intermediate", "Advanced"], 
      required: [true, "Difficulty level is required"] 
    },
    prize: { 
      type: String, 
      required: [true, "Prize pool info is required"] 
    },
    startDate: { 
      type: Date, 
      required: [true, "Start date is required"] 
    },
    endDate: { 
      type: Date, 
      required: [true, "End date is required"] 
    },
    rules: { 
      type: String, 
      required: [true, "Rules and guidelines are required"] 
    },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    participants: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      }
    ],
    status: { 
      type: String, 
      enum: ["Draft", "Published", "Completed"], 
      default: "Draft" 
    },
    
    // 🔥 Phase 6: AI Judging Criteria Weights
    // প্রজেক্টকে ইনসেন লেভেলে নেওয়ার জন্য ৫টি ক্রাইটেরিয়া আগে থেকেই স্কিমাতে ডিফাইন করে রাখলাম
    aiJudgingWeights: {
      codeQuality: { type: Number, default: 20 },
      uiUx: { type: Number, default: 20 },
      innovation: { type: Number, default: 20 },
      performance: { type: Number, default: 20 },
      documentation: { type: Number, default: 20 },
    }
  },
  { 
    timestamps: true // এটি অটোমেটিক createdAt এবং updatedAt টাইমস্ট্যাম্প হ্যান্ডেল করবে
  }
);

// Next.js সার্ভারলেস এনভায়রনমেন্টে মডেল রিলোডিং বাগ এড়াতে models.Contest চেক করা হয়েছে
export const Contest = models.Contest || model("Contest", ContestSchema);