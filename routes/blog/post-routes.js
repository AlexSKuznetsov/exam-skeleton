/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import express from 'express';
import PostModel from '../../models/posts.js';
import CatModel from '../../models/category.js';
import { auth } from '../../middleware/auth.js';

const route = express.Router();

route.get('/post', auth, async (req, res) => {
  const category = await CatModel.find();
  res.render('blog/post', {
    category,
  });
});

route.post('/post', async (req, res) => {
  const { title, body, category } = req.body;
  const findCat = await CatModel.findOne({ name: category });
  const userid = res.locals.user._id;
  const newPost = new PostModel({
    title,
    body,
    category: findCat,
    user: userid,
  });
  await newPost.save();
});

export default route;
