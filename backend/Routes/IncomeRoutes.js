const express = require("express");

const IncomeController = require("../Controller/IncomeController");

const router = express.Router();

router.get("/income/:userId", IncomeController.getIncome);
router.get("/income/:userId/:id", IncomeController.getIncomeById);
router.get("/total/income/:userId", IncomeController.getTotalIncome);

router.post("/income", IncomeController.createIncome);
router.put("/income/:id", IncomeController.updateIncomeById);
router.delete("/income/:id", IncomeController.deleteIncomeById);

module.exports = router;
