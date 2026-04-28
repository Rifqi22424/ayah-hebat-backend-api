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

router.post(
  "/",
  authorizeAdmin,
  uploadPhotoMiddleware,
  /* #swagger.tags = ['News Controller']
  #swagger.consumes = ['multipart/form-data']
  #swagger.requestBody = {
      required: true,
      content: {
          "multipart/form-data": {
              schema: {
                  type: "object",
                  properties: {
                      photo: {
                          type: "string",
                          format: "binary",
                          description: "Upload gambar berita"
                      },
                      title: { type: "string" },
                      subTitle: { type: "string" },
                      content: { type: "string" },
                      author: { type: "string" }
                  },
                  required: ["title", "subTitle", "content", "author"]
              }
          }
      }
  }
  */ createNews,
);
router.put(
  "/:id",
  authorizeAdmin,
  uploadPhotoMiddleware,
  /* #swagger.tags = ['News Controller']
  #swagger.consumes = ['multipart/form-data']
  #swagger.requestBody = {
      required: false,
      content: {
          "multipart/form-data": {
              schema: {
                  type: "object",
                  properties: {
                      photo: {
                          type: "string",
                          format: "binary",
                          description: "Upload gambar berita"
                      },
                      title: { type: "string" },
                      subTitle: { type: "string" },
                      content: { type: "string" },
                      author: { type: "string" }
                  }
              }
          }
      }
  }
  */ editNews,
);
router.delete("/:id", /* #swagger.tags = ['News Controller'] */ authorizeAdmin, deleteNewsById); // Endpoint hapus berita berdasarkan ID
router.delete("/", /* #swagger.tags = ['News Controller'] */ authorizeAdmin, deleteAllNews);

module.exports = router;
