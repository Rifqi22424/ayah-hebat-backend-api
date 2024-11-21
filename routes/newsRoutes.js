const express = require("express");
const router = express.Router();
const {
  getAllNews,
  getNewestNews,
  getPopularNews,
  getNewsById,
  createNews,
  editNews,
  deleteNewsById,
  deleteAllNews,
} = require("../controllers/newsController");
const { uploadPhotoMiddleware } = require("../middlewares/uploadMiddleware");
const { authorizeAdmin } = require("../middlewares/authorizationMiddleware");

router.get("/", getAllNews);
router.get("/new", getNewestNews);
router.get("/popular", getPopularNews);
router.get("/:id", getNewsById);

router.post("/", authorizeAdmin, uploadPhotoMiddleware, createNews);
router.put("/:id", authorizeAdmin, uploadPhotoMiddleware, editNews);
router.delete("/:id", authorizeAdmin, deleteNewsById); // Endpoint hapus berita berdasarkan ID
router.delete("/", authorizeAdmin, deleteAllNews);

module.exports = router;
