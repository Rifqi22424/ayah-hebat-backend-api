const express = require("express");
const {
  getPeminjamanBuku,
  getPeminjamanBukuById,
  updateStatusBuku,
  updatePeminjamanDates,
} = require("../../controllers/admin/peminjamanManagementController");

const router = express.Router();

router.get(
  "/",
  /* #swagger.tags = ['Admin Peminjaman Management Controller'] */ getPeminjamanBuku,
);
router.get(
  "/:id",
  /* #swagger.tags = ['Admin Peminjaman Management Controller'] */ getPeminjamanBukuById,
);
router.put(
  "/:id",
  /* #swagger.tags = ['Admin Peminjaman Management Controller'] */ updateStatusBuku,
);
router.patch(
  "/:id",
  /* #swagger.tags = ['Admin Peminjaman Management Controller']
  #swagger.description = 'Update field tanggal pada data peminjaman secara parsial.'
  #swagger.requestBody = {
      required: false,
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      submissionDate: {
                          type: "string",
                          format: "date-time",
                          description: "Tanggal pengajuan. Wajib valid bila diisi."
                      },
                      deadlineDate: {
                          type: "string",
                          format: "date-time",
                          description: "Tanggal batas pengembalian. Wajib valid bila diisi."
                      },
                      plannedPickUpDate: {
                          type: "string",
                          format: "date-time",
                          description: "Tanggal rencana pengambilan. Wajib valid bila diisi."
                      },
                      actualPickUpDate: {
                          type: "string",
                          format: "date-time",
                          nullable: true,
                          description: "Tanggal aktual pengambilan. Boleh null."
                      },
                      returnDate: {
                          type: "string",
                          format: "date-time",
                          nullable: true,
                          description: "Tanggal pengembalian. Boleh null."
                      },
                      cancelDate: {
                          type: "string",
                          format: "date-time",
                          nullable: true,
                          description: "Tanggal pembatalan. Boleh null."
                      }
                  },
                  example: {
                      deadlineDate: "2026-05-10T00:00:00.000Z",
                      plannedPickUpDate: "2026-05-01T00:00:00.000Z",
                      actualPickUpDate: null,
                      returnDate: null,
                      cancelDate: null
                  }
              }
          }
      }
  }
  #swagger.responses[200] = {
      description: 'Berhasil memperbarui data peminjaman',
      content: {
          "application/json": {
              example: {
                  message: "success get data",
                  data: {
                      id: 2,
                      bookId: 3,
                      userId: 3,
                      status: "ALLOWED",
                      submissionDate: "2026-04-27T06:39:19.481Z",
                      deadlineDate: "2026-05-10T00:00:00.000Z",
                      plannedPickUpDate: "2026-05-01T00:00:00.000Z",
                      actualPickUpDate: "2026-05-01T00:00:00.000Z",
                      returnDate: "2026-05-01T00:00:00.000Z",
                      cancelDate: "2026-05-01T00:00:00.000Z",
                      createdAt: "2026-04-27T06:39:19.481Z",
                      updatedAt: "2026-04-29T05:45:39.661Z",
                      user: {
                          id: 3,
                          username: "panjiangkasa",
                          email: "panjiangkasaputra1@gmail.com",
                          role: "USER",
                          isVerified: true,
                          isActive: true,
                          fcmToken: null,
                          totalScoreYear: 0,
                          totalScoreMonth: 0,
                          totalScoreDay: 0
                      },
                      book: {
                          id: 3,
                          name: "Tes",
                          description: "Tes",
                          stock: 1,
                          imageurl: "photo-1777271604166-548579765.png",
                          userId: 3,
                          status: "ACCEPTED",
                          planSentAt: "2026-04-27T00:00:00.000Z",
                          acceptedAt: "2026-04-27T06:38:29.614Z",
                          rejectedAt: null,
                          canceledAt: null,
                          createdAt: "2026-04-27T06:33:24.170Z",
                          updatedAt: "2026-04-27T06:42:01.799Z"
                      }
                  }
              }
          }
      }
  }
  */ updatePeminjamanDates,
);

module.exports = router;
