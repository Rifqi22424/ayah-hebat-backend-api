const express = require("express");
const {
  createInfaq,
  getInfaqHistory,
  getInfaqById,
  getAllInfaq,
  getTotalAmountInfaqUser,
} = require("../controllers/infaqController");

const router = express.Router();

router.get("/history", getInfaqHistory);
router.get("/amount", getTotalAmountInfaqUser);
router.get("/:id", getInfaqById);
router.get("/", getAllInfaq);
router.post("/", createInfaq);

module.exports = router;
