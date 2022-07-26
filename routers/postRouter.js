const express = require('express');
const postRouter = express.Router();

const {
  getAllPost,
  getWrite,
  postWrite,
  getOnePost,
  getEditPost,
  postEditPost,
  getdeletePost,
  deleteOnePost,
} = require('../controllers/postController');

// 모든 게시글 조회
postRouter.get('/', getAllPost);

// 게시글 작성 GET / POST
postRouter.get('/post', getWrite);
postRouter.post('/post', postWrite);

// 특정 게시글 GET / DELETE
postRouter.get('/post/:postId([0-9a-fA-F]{24})', getOnePost);
postRouter.get('/post/delete/:postId([0-9a-fA-F]{24})', getdeletePost);
postRouter.delete('/post/delete/:postId', deleteOnePost);

// 게시글 수정 GET / POST
postRouter.get('/post/edit/:postId([0-9a-fA-F]{24})', getEditPost);
postRouter.post('/post/edit/:postId([0-9a-fA-F]{24})', postEditPost);


module.exports = postRouter;