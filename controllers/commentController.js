const Comment = require('../schemas/Comment');

const postComment = async (req, res) => {
  try {
    const {
      params: { postId },
      body: { comment, writer },
    } = req;

    await Comment.create({
      post: postId,
      comment,
      writer,
    });

    res.redirect(`/board/post/${postId}`);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const editComment = async (req, res) => {
  try {
    const {
      params: { postId, commentId },
      body: { comment },
    } = req;
    await Comment.findOneAndUpdate({ post: postId, _id: commentId }, { comment });
    res.redirect(`/board/post/${postId}`);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const {
      params: { postId, commentId },
    } = req;
    await Comment.findOneAndDelete({ _id: commentId, post: postId });
    res.redirect(`/board/post/${postId}`);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { postComment, editComment, deleteComment };