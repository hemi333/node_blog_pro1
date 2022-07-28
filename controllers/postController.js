const Comment = require('../schemas/Comment');
const Post = require('../schemas/Post');

// 모든 게시글 조회
const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({_id:-1})
    res.status(200).render('board', { posts });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// 게시글 작성 GET / POST
const getWrite = (req, res) => {
  try {
    res.status(200).render('write');
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const postWrite = async (req, res) => {
  try {
    const {
      body: { writer, title, contents, password },
    } = req;
    const post = await Post.create({
      writer,
      title,
      contents,
      password,
    });
    res.redirect(`/board/post/${post._id}`);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// 특정 게시글 GET / DELETE
const getOnePost = async (req, res) => {
  try {
    const {
      params: { postId },
    } = req;
    const comments = await Comment.find({ post: postId });
    const post = await Post.findOne({ _id: postId });
    res.status(200).render('post', { post, comments });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getdeletePost = async (req, res) => {
  try {
    const {
      params: { postId },
    } = req;
    const post = await Post.findOne({ _id: postId });
    res.status(200).render('deletePost', { post });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteOnePost = async (req, res) => {
  try {
    const {
      params: { postId },
      body: { password },
    } = req;
  const deletepost = await Post.findOne({ _id: postId });
  console.log(deletepost);
  console.log(password);
    if (password !== deletepost.password) {
      res.json({ message: '비밀번호가 올바르지 않습니다.' });
    } else {
      await Post.deleteOne(deletepost);
    };
    res.json({ message: '게시글을 삭제하였습니다.' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  };
};

// 게시글 수정 GET / POST
const getEditPost = async (req, res) => {
  try {
    const {
      params: { postId },
    } = req;
    const post = await Post.findOne({ _id: postId });
    res.status(200).render('editPost', { post });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const postEditPost = async (req, res) => {
  try {
    const {
      params: { postId },
      body: { title, contents, password },
    } = req;
    const targetPost = await Post.findOneAndUpdate({ _id: postId }, { title, contents });
    if(password == targetPost.password) {
      targetPost.post = {title, contents};
      targetPost.save();
      res.redirect(`/board/post/${postId}`);
    } else {
      res.status(403).send({ ERROR: '비밀번호가 올바르지 않습니다.' });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getAllPost,
  getWrite,
  postWrite,
  getOnePost,
  getEditPost,
  postEditPost,
  getdeletePost,
  deleteOnePost,
};