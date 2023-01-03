const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../models/User')

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/register', function (req, res) {
    res.render("site/register")
})

router.post('/register', urlencodedParser, function (req, res) {
    User.create(req.body, (error, user) => {
        if(error === null) {
            console.log(user.email + " başarıyla kayıt edildi")
        } else {
            console.log(error)
            console.log(error.code == 11000 ? error.keyValue + " kullanılmaktadır!" : "")
        }
        res.redirect('/');
    })
})

router.get('/login', function (req, res) {
    res.render("site/login")
})

router.post('/login', urlencodedParser, function (req, res) {
    const {email, password} = req.body    
    User.find({
        email: email,
        password: password,
    }, (err, user) => {
        if(user.length === 1) {
            // Oturum açma başarılı
            res.redirect("/")
        } else {
            res.redirect("/users/login")
        }
    })
    
})

module.exports = router;
