const express = require("express");
const URL = require("../models/url.model");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        if(!req.user) return res.redirect('/login')
        const allUrls = await URL.find({createdBy : req.user._id });
        res.render('home', { urls: allUrls });
    } catch (error) {
        console.error('Error fetching URLs:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/signup',(req,res)=>{
    return res.render('signup')
})
router.get('/login',(req,res)=>{
    return res.render('login')
})

module.exports = router;
