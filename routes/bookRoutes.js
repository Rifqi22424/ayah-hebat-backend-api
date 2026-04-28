const express = require("express");
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  createBookDonation,
  updateBookDonationStatus,
  getMyBookDonations,
  getMyBookDonationById,
} = require("../controllers/bookController");
const { uploadPhotoMiddleware } = require("../middlewares/uploadMiddleware");
const router = express.Router();

router.get(
  "/donation/:id",
  /* #swagger.tags = ['Books Controller'] */ getMyBookDonationById,
);
router.get(
  "/donation",
  /* #swagger.tags = ['Books Controller'] */ getMyBookDonations,
);
router.post(
  "/donation",
  uploadPhotoMiddleware,
  /* #swagger.tags = ['Books Controller']
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
                          description: "Upload gambar buku"
                      },
                      name: {
                          type: "string",
                          description: "Nama buku"
                      },
                      description: {
                          type: "string"
                      },
                      categoryIds: {
                          type: "string",
                          description: "Contoh: 1,2,3"
                      },
                      stock: {
                          type: "integer"
                      },
                      planSentAt: {
                          type: "string",
                          format: "date"
                      }
                  },
                  required: ["photo", "name", "description", "categoryIds", "stock", "planSentAt"]
              }
          }
      }
  }
*/ createBookDonation,
);
router.put(
  "/donation/:id",
  /* #swagger.tags = ['Books Controller'] */ updateBookDonationStatus,
);

router.get("/", /* #swagger.tags = ['Books Controller'] */ getBooks);
router.get("/:id", /* #swagger.tags = ['Books Controller'] */ getBookById);
router.post(
  "/",
  uploadPhotoMiddleware,
  /* #swagger.tags = ['Books Controller']
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
                          description: "Upload gambar buku"
                      },
                      name: { type: "string" },
                      description: { type: "string" },
                      categoryIds: {
                          type: "string",
                          description: "Contoh: 1,2,3"
                      },
                      stock: { type: "integer" }
                  },
                  required: ["name", "description", "categoryIds", "stock"]
              }
          }
      }
  }
  */ createBook,
);
router.put(
  "/:id",
  uploadPhotoMiddleware,
  /* #swagger.tags = ['Books Controller']
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
                          description: "Upload gambar buku"
                      },
                      name: { type: "string" },
                      description: { type: "string" },
                      stock: { type: "integer" },
                      status: {
                          type: "string",
                          description: "PENDING | ACCEPTED | REJECTED | CANCELLED"
                      },
                      email: {
                          type: "string",
                          description: "Email user pemilik buku"
                      },
                      categoryIds: {
                          type: "array",
                          items: { type: "integer" },
                          description: "Contoh: [1,2,3]"
                      }
                  }
              }
          }
      }
  }
  */ updateBook,
);
router.delete("/:id", /* #swagger.tags = ['Books Controller'] */ deleteBook);

module.exports = router;
