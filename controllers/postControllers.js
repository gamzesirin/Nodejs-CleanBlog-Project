const fs = require('fs');
const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort('-dateCreated');
  res.render('index', {
    posts,
  });
};

exports.getPost = async (req, res) => {
  // console.log(req.params.id);
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
};
exports.createPost = async (req, res) => {
  // async - await yapısı kullanacğız.
  await Post.create(req.body); // body bilgisini Post modeli sayesinde veritabanında dökümana dönüştürüyoruz.
  res.redirect('/');
};
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        detail: req.body.detail,
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedPost) {
      return res.status(404).send('Post not found');
    }

    res.redirect(`/posts/${updatedPost._id}`);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send('Internal Server Error');
  }
};
exports.deletePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
