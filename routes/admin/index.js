const express = require("express");
const Category = require("../../models/Category")
const bodyParser = require('body-parser')
const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function (req, res) {
    res.render("admin/index")
})

router.get('/categories', function (req, res) {
    Category.find({}).lean().then(categories => {
        res.render("admin/categories", {categories:categories})
    })
})

router.post('/categories', urlencodedParser, function (req, res) {
    Category.create(req.body, (error, post) => {
        if (!error) { 
            res.redirect('/admin/categories');
        }
    })
})

module.exports = router;