const express = require("express");
const router = express.Router();
const watchController = require("../controllers/contentController");
const { authorizeAdmin } = require("../middlewares/authorizationMiddleware");
const upload = require("../middlewares/multerConfig");

router.route("/").post(authorizeAdmin, upload.single("thumbnail"), watchController.createWatch).get(watchController.getAllWatches);

router.route("/:id").put(authorizeAdmin, upload.single("thumbnail"), watchController.updateWatch).delete(authorizeAdmin, watchController.deleteWatch).get(watchController.getWatchById);

router.route("/:id/view").patch(watchController.incrementWatchView);

module.exports = router;
