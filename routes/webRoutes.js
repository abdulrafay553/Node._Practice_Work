const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const jsonparser = bodyParser.json()
const urlendcoded = bodyParser.urlencoded({ exntended: false })

router.get("/about", (req, res) => {
    var jverify = jwt.verify(req.cookies.user_token, 'qwerty')
    console.log(jverify)

    res.render('about', { cdata: jverify });
})

router.get("/contact", (req, res) => {
    res.render('contact');
})

router.get("/", (req, res) => {
    res.render('home');
})

module.exports = router