const express = require('express')
const {handleGenerateNewShortURL, handleGetAnalytics} = require('../controllers/url.controller')
const router = express.Router()

router.post('/',handleGenerateNewShortURL)

router.post('/analytics/:shortId',handleGetAnalytics)

module.exports = router