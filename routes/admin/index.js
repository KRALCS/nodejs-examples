const express = require("express");
const Category = require("../../models/Category")
const bodyParser = require('body-parser')
const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function (req, res) {
    res.render("admin/index")
})

router.get('/categories', function (req, res) {
    Category.find({}).sort({$natural: -1}).lean().then(categories => {
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

router.delete('/categories/:id', function (req, res) {
    Category.remove({_id: req.params.id}).then(() => {
        res.redirect("/admin/categories")
    });
})

module.exports = router;