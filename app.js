const express = require('express');
const methodOverride = require('method-override');
const esj = require('ejs');
const mongoose = require('mongoose');
const app = express();

const dotenv = require('dotenv');
const db = require('./config/db');

const pageControllers = require('./controllers/pageControllers');
const postControllers = require('./controllers/postControllers');
dotenv.config();

const myLogger = (req, res, next) => {
  console.log('Middleware Log 1');
  next();
};
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(myLogger);

app.get('/', postControllers.getAllPosts);

app.get('/posts/:id', postControllers.getPost);

app.get('/about', pageControllers.getAboutPage);

app.get('/add_post', pageControllers.getAddPostPage);

app.get('/posts/edit/:id', pageControllers.getEditPostPage);

app.post('/posts', postControllers.createPost);

app.put('/posts/:id', postControllers.updatePost);

app.get('/posts/delete/:id', postControllers.deletePost);

const PORT = process.env.PORT || 3000;

db();

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda başlatıldı.`);
});
