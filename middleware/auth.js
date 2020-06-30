/* eslint-disable consistent-return */
/* eslint-disable max-len */
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
export function cookiesCleaner(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
}

export function auth(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}