import mongoose from "mongoose";
const Schema = mongoose.Schema;
const transactionSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "User",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "User",
    },
    amount: {
      type: Number,
      default: 0,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["Credit", "Debit"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
