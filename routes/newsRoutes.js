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

router.get("/", /* #swagger.tags = ['News Controller'] */ getAllNews);
router.get("/new", /* #swagger.tags = ['News Controller'] */ getNewestNews);
router.get("/popular", /* #swagger.tags = ['News Controller'] */ getPopularNews);
router.get("/:id", /* #swagger.tags = ['News Controller'] */ getNewsById);

router.post("/", /* #swagger.tags = ['News Controller'] */ authorizeAdmin, uploadPhotoMiddleware, createNews);
router.put("/:id", /* #swagger.tags = ['News Controller'] */ authorizeAdmin, uploadPhotoMiddleware, editNews);
router.delete("/:id", /* #swagger.tags = ['News Controller'] */ authorizeAdmin, deleteNewsById); // Endpoint hapus berita berdasarkan ID
router.delete("/", /* #swagger.tags = ['News Controller'] */ authorizeAdmin, deleteAllNews);

module.exports = router;
