const express = require("express");

const LatestTransactionController = require("../Controller/TransactionController");

const router = express.Router();

router.get(
  "/latestTransaction/:userId",
  LatestTransactionController.getLatestTransaction
);

module.exports = router;
