/* eslint-disable import/extensions */
import express from 'express';
import UserModel from '../models/user-schema.js';

const route = express.Router();

route.get('/dashboard', async (req, res) => {
  const { user } = res.locals;
  if (user) {
    const userCount = await UserModel.countDocuments();
    res.render('dashboard', {
      user,
      userCount,
    });
  } else {
    res.redirect('/login');
  }
});

export default route;
