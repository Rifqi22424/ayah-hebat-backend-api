const express = require('express');
const { createComment, editComment, deleteComment, likeComment, getPostCommentsById } = require('../controllers/commentController');
const router = express.Router();

router.get('/:postId', getPostCommentsById);
router.post('/:postId', createComment);
router.put('/:commentId', editComment);
router.delete('/:commentId', deleteComment);

router.post('/:commentId/like', likeComment);

module.exports = router;