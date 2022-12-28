const express = require("express");
const bodyParser = require('body-parser')
const Post = require('../models/Post')

const router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/new', function (req, res) {
  res.render("site/addpost")
})
router.post('/new', urlencodedParser, function (req, res) {
    Post.create(req.body, (error, post) => {
        console.log(error, post)
    })
    res.send("test ok")
})

/* POST /api/users gets JSON bodies
router.post('/posts/test', jsonParser, function (req, res) {
    console.log(req.body)
    res.send("test json")
})
*/

module.exports = router;