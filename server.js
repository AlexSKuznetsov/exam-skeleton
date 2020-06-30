/* eslint-disable import/extensions */
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from 'morgan';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import sessionFileStore from 'session-file-store';
import hbs from 'hbs';

import loginRoute from './routes/login-route.js';
import registerRoute from './routes/register-route.js';
import logoutRoute from './routes/logout-route.js';
import dashboardRoute from './routes/dashboard-route.js';

// blog routes import
import categoryRoutes from './routes/blog/category-router.js';
import postRoutes from './routes/blog/post-routes.js';

import errorMiddleware from './middleware/error-handler.js';
import { cookiesCleaner } from './middleware/auth.js';

// Config file
dotenv.config();

// Mongoose connect
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Session filestore
const FileStore = sessionFileStore(session);

const app = express();

app.use(logger('dev'));
app.use(express.static(path.resolve('public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    store: new FileStore(),
    secret: process.env.SECRET, // это нужно изменить на свой рандомный ключь
    resave: false,
    saveUninitialized: false, // это нужно для инициализации сессии сразу
    cookie: {
      secret: false, // значение true для https сервера
      expires: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Cookie parser
app.use(cookieParser());

// HBS
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));
hbs.registerPartials(path.resolve('views/partials'));

// Middleware save session to res.locals
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Route GET / - index
app.get('/', (req, res) => {
  if (req.session.user) {
    res.render('index', {
      login: req.session.user,
    });
  } else {
    res.render('index');
  }
});

// Routes
app.use(loginRoute);
app.use(registerRoute);
app.use(logoutRoute);
app.use(dashboardRoute);

// blog routes
app.use(categoryRoutes);
app.use(postRoutes);

// Error handler route
app.use(cookiesCleaner);
app.use(errorMiddleware);

// Serever up
app.listen(process.env.PORT ?? 3000);
