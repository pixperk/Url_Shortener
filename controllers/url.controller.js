const shortid = require("shortid");

const URL = require("../models/url.model");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required!" });

  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy : req.user._id //comes from auth.middleware
  });
  return res.render('home',{id: shortId})
}

async function handleGetAnalytics(req,res){
  const shortId = req.params.shortId
  const result = await URL.findOne({shortId})
  return res.json({totalVisits : result.visitHistory.length, analytics : result.visitHistory})
}



module.exports = {handleGenerateNewShortURL,handleGetAnalytics}