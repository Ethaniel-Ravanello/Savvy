const express = require("express");
const cors = require("cors");

const UserRoutes = require("./Routes/UserRoutes");
const AuthRoutes = require("./Routes/AuthRoutes");
const IncomeRoutes = require("./Routes/IncomeRoutes");
const ExpenseRoutes = require("./Routes/ExpenseRoutes");
const TransactionRoutes = require("./Routes/TransactionRoute");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(
  process.env.MONGOOSE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("Connected to MongoDB")
);

const app = express();

app.use(cors());
app.use(express.json());

app.use(UserRoutes);
app.use(AuthRoutes);
app.use(IncomeRoutes);
app.use(ExpenseRoutes);
app.use(TransactionRoutes);

app.listen(5000, () => console.log("Server is Up and Running"));
