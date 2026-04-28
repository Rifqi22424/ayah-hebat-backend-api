const express = require('express');
const { createPost, editPost, deletePost, getAllPosts, searchPosts, likePost, dislikePost } = require('../controllers/postController');
const router = express.Router();

router.post('/', /* #swagger.tags = ['Post Controller'] */ createPost);
router.put('/:postId', /* #swagger.tags = ['Post Controller'] */ editPost);
router.delete('/:postId', /* #swagger.tags = ['Post Controller'] */ deletePost);
router.get('/', /* #swagger.tags = ['Post Controller'] */ getAllPosts);
router.get('/search', /* #swagger.tags = ['Post Controller'] */ searchPosts);

router.post('/:postId/like', /* #swagger.tags = ['Post Controller'] */ likePost);
router.delete('/:postId/like', /* #swagger.tags = ['Post Controller'] */ dislikePost);

module.exports = router;
