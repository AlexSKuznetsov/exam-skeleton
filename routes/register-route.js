/* eslint-disable import/extensions */
import express from 'express';
import UserModel from '../models/user-schema.js';

const route = express.Router();

route.get('/register', (req, res) => {
  res.render('register');
});

route.post('/register', async (req, res) => {
  const { login, email, password } = req.body;
  const find = await UserModel.findUserAndLogin(login, password);
  if (find.length === 0) {
    const user = new UserModel({
      login,
      email,
      password,
    });
    try {
      await user.save();
    } catch (ex) {
      console.log(ex.message);
    }
    const userObj = user.toObject();
    delete userObj.password;
    req.session.user = userObj;
    res.json({ result: 'ok' });
  } else {
    res.json({ result: 'Ошибка' });
  }
});

export default route;
