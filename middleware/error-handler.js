import express from 'express';

const route = express.Router();

route.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

route.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default route;
