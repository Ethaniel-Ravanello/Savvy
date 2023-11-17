const express = require("express");

const ExpenseController = require("../Controller/ExpensesController");

const router = express.Router();

router.get("/expense/:userId", ExpenseController.getExpenses);
router.get("/expense/:userId/:id", ExpenseController.getExpensesById);
router.get("/total/expense/:userId", ExpenseController.getTotalExpense);

router.post("/expense", ExpenseController.createExpense);
router.put("/expense:id", ExpenseController.updateExpense);
router.delete("/expense:id", ExpenseController.deleteExpense);

module.exports = router;
