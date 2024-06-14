const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser')
const {restrictToLoggedInUserOnly, checkAuth} = require('./middlewares/auth.middleware')

const urlRoute = require("./routes/url.route");
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user.route')

const { connectToMongoDB } = require("./connection");
const URL = require("./models/url.model");

connectToMongoDB("mongodb://127.0.0.1:27017/urlShortener").then(() =>
  console.log("MongoDB Connection SUCCESSFUL!")
);

const app = express();
const PORT = 8001;

//SSR
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json()); //to parse json bodies
app.use(express.urlencoded({extended:false}))//to parse form data
app.use(cookieParser())


app.use("/url",restrictToLoggedInUserOnly,urlRoute);
app.use('/',checkAuth,staticRoute)
app.use('/user',userRoute)

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log("Server running at Port ", PORT);
});
