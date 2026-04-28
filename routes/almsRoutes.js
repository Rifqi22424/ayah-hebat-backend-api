const express = require("express");
const { createAlms, getAlmsHistory, getAllAlms, getAlmsById, getTotalAmountAlmsUser, changeAlmStatus } = require("../controllers/almsController");
const { authorizeAdmin } = require("../middlewares/authorizationMiddleware");
const { uploadPhotoMiddleware } = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.get("/history", getAlmsHistory);
router.get("/amount", getTotalAmountAlmsUser);
router.get("/:id", getAlmsById);
router.post("/", uploadPhotoMiddleware, createAlms);

// Admin system
// get all alms
router.get("/", authorizeAdmin, getAllAlms);
// change the status of the alms
router.patch("/:id", authorizeAdmin, changeAlmStatus);

module.exports = router;
