import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(
  process.env.MONGOOSE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("Connected To MongoDB")
);
