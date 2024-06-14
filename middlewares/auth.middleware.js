const { getUser } = require("../services/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.user_sessionId;

  const user = getUser(userUid);

  if (!userUid || !user) return res.redirect("/login");
  req.user = user;
  next();
}

async function checkAuth (req, res, next) {
  const userUid = req.cookies?.user_sessionId;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {restrictToLoggedInUserOnly,checkAuth}