import express from 'express';
import UserModel from '../models/user-schema.js';

const route = express.Router();

route.get('/login', (req, res) => {
  res.render('login');
});

route.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const user = await UserModel.findOne({ login, password });
  if (user) {
    const userObj = user.toObject();
    delete userObj.password;
    req.session.user = userObj;
    res.json({ result: 'ok' });
  } else {
    res.json({ result: 'not found' });
  }
});

export default route;
