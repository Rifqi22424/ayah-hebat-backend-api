const express = require('express');
const {createCommentBook, showComment} = require("./../controllers/commentBookController")

const router = express.Router();

router.get("/:id", showComment);
router.post("/:id", createCommentBook);

module.exports = router;