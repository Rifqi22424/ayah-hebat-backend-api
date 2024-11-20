const express = require('express');
const {createCommentBook, showComment, editComment, deleteComment} = require("./../controllers/commentBookController")

const router = express.Router();

router.post("/:bookId", createCommentBook);
router.put("/:bookId/comments/:commentId", editComment);
router.delete("/:bookId/comments/:commentId", deleteComment);
module.exports = router;