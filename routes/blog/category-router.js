/* eslint-disable import/extensions */
import express from 'express';
import CatModel from '../../models/category.js';

const route = express.Router();

route.get('/category', async (req, res) => {
  const { user } = res.locals;
  if (user) {
    const category = await CatModel.find();
    res.render('blog/category', {
      category,
    });
  } else {
    res.redirect('login');
  }
});

route.post('/category', async (req, res) => {
  const { name } = req.body;
  const newCat = new CatModel({
    name,
  });
  await newCat.save();
  res.send({ result: 'ok' });
});

export default route;
