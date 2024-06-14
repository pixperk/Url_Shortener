const User = require("../models/user.model");
const {v4:uuidv4} = require('uuid')
const {setUser,getUser} = require('../services/auth')

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body; //will come from form/json body
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect('/');
}

async function handleUserLogIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid credentials",
    });
   
    const sessionId = uuidv4()
    setUser(sessionId, user)
    res.cookie('user_sessionId', sessionId)
  return res.redirect("/");
}

module.exports = { handleUserSignUp, handleUserLogIn };
