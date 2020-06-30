import express from 'express';

const route = express.Router();

route.get('/logout/:id', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid', { path: '/' });
    res.redirect('/');
  });
});

export default route;
