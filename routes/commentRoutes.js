const express = require('express');
const { createComment, editComment, deleteComment, likeComment, getPostCommentsById } = require('../controllers/commentController');
const router = express.Router();

router.get('/:postId', /* #swagger.tags = ['Comment Controller'] */ getPostCommentsById);
router.post('/:postId', /* #swagger.tags = ['Comment Controller'] */ createComment);
router.put('/:commentId', /* #swagger.tags = ['Comment Controller'] */ editComment);
router.delete('/:commentId', /* #swagger.tags = ['Comment Controller'] */ deleteComment);

router.post('/:commentId/like', /* #swagger.tags = ['Comment Controller'] */ likeComment);

module.exports = router;
