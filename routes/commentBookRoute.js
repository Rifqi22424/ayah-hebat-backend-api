const express = require('express');
const {createCommentBook, showComment, editComment, deleteComment} = require("./../controllers/commentBookController")

const router = express.Router();

router.post("/:bookId", /* #swagger.tags = ['Comment Book Controller'] */ createCommentBook);
router.put("/:bookId/comments/:commentId", /* #swagger.tags = ['Comment Book Controller'] */ editComment);
router.delete("/:bookId/comments/:commentId", /* #swagger.tags = ['Comment Book Controller'] */ deleteComment);
module.exports = router;
