const express = require("express");
const {
  createAllocationType,
  getAllocationTypes,
  // editAllocationType,
  updateAllocationTypeStatus,
} = require("../controllers/allocationTypeController");

const router = express.Router();

router.put("/status/:id", updateAllocationTypeStatus);
// router.put("/:id", editAllocationType);
router.post("/", createAllocationType);
router.get("/", getAllocationTypes);

module.exports = router;
