const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const kegiatanRoutes = require("./routes/kegiatanRoutes.js");
const questionRoutes = require("./routes/questionRoutes.js");
const notificationRoutes = require("./routes/notificationRoutes.js");
const newsRoutes = require("./routes/newsRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js");
const peminjamanBukuRoute = require("./routes/peminjamanBukuRoute.js");
const replyRoutes = require("./routes/replyRoutes.js");
const reportRoutes = require("./routes/reportRoutes.js");

// admin routes
const peminjamanManamagementRoutes = require("./routes/admin/peminjamanManagementRoutes.js");

const { PrismaClient } = require("@prisma/client");
const { authenticateToken } = require("./middlewares/jwtMiddleware.js");
var cron = require("node-cron");
const {
  updateAllUsersTotalScore,
} = require("./controllers/kegiatanController.js");
const bookRoutes = require("./routes/bookRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const commentBookRoutes = require("./routes/commentBookRoute");
const officeAddressRoutes = require("./routes/officeAddressRoutes");
// const path = require('path');

const { fixDuplicateUsernames } = require("./setup/fixDuplicateUsernames.js");
require("dotenv").config();
const setupAdmin = require("./setup/setupAdmin.js");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const { serve } = require("swagger-ui-express");
const { authorizeAdmin } = require("./middlewares/authorizationMiddleware.js");
const swaggerDoc = YAML.load("./ayah-hebat-api.yaml");

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.use("/api-docs", serve, swaggerUI.setup(swaggerDoc));

app.use("/uploads", express.static("uploads"));
app.use("/uploads/books", express.static("uploads/books"));
app.use("/auth", authRoutes);

// app.use('/.well-known', express.static(path.join(__dirname, '.well-known')));
app.use(authenticateToken);

app.use("/user", userRoutes);
app.use("/profile", profileRoutes);
app.use("/kegiatan", kegiatanRoutes);
app.use("/question", questionRoutes);
app.use("/notification", notificationRoutes);
app.use("/news", newsRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/reply", replyRoutes);
app.use("/report", reportRoutes);
app.use("/pinjam-buku", peminjamanBukuRoute);
app.use("/books", bookRoutes);
app.use("/categories", categoryRoutes);
app.use("/comment-book", commentBookRoutes);
app.use("/address", officeAddressRoutes);

app.use(authorizeAdmin);
app.use("/admin/peminjaman-buku", peminjamanManamagementRoutes)

async function logError(error) {
  try {
    await prisma.errorLog.create({
      data: {
        errorMessage: error.message,
        stackTrace: error.stack,
      },
    });
  } catch (err) {
    console.error("Failed to log error:", err);
  }
}

app.use((err, req, res, next) => {
  logError(err).catch(console.error);
  res.status(500).send("An error occurred");
});

cron.schedule(
  "26 1 * * *",
  async () => {
    console.log("Running daily score update...");
    await updateAllUsersTotalScore();
    console.log("Daily score update completed.");
  },
  {
    scheduled: true,
    timezone: "Asia/Jakarta",
  }
);

async function initializeApp() {
  try {
    await setupAdmin();
    await fixDuplicateUsernames();
  } catch (e) {
    console.error("Error during initialization:", e);
  } finally {
    await prisma.$disconnect();
  }

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

initializeApp();
