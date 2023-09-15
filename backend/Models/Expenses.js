import mongoose from "mongoose";

const ExpensesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    expenses_name: {
      type: String,
      required: true,
    },
    expenses_description: {
      type: String,
    },
    expenses_amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expenses", ExpensesSchema);
