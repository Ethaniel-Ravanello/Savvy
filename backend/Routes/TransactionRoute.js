const express = require("express");

const LatestTransactionController = require("../Controller/TransactionController");

const router = express.Router();

router.get(
  "/latestTransaction/:userId",
  LatestTransactionController.getLatestTransaction
);

router.delete(
  "/delete/transaction/:type/:transactionId",
  LatestTransactionController.deleteTransaction
);
router.delete(
  "/delete/transaction/all/:userId",
  LatestTransactionController.deleteAllTransaction
);

module.exports = router;
