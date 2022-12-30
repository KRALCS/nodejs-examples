const express = require("express");
const bodyParser = require('body-parser')
const Post = require('../models/Post')
const path = require('path')
const router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/new', function (req, res) {
  res.render("site/addpost")
})

router.post('/new', urlencodedParser, function (req, res) {
    let postImage = req.files.post_image
    uploadPath = __dirname + '/../public/img/postimages/' + postImage.name;
    postImage.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
    });
    Post.create({
        ...req.body,
        post_image: `/img/postimages/${postImage.name}`
    }, (error, post) => {
        console.log(error, post)
    })
    res.send('File uploaded to ' + uploadPath);
})

router.get('/:id', async function (req, res) {
    let post = Post.findById(req.params.id).lean();
    post = await post;
    res.render("site/post", {post:post})
})

/* POST /api/users gets JSON bodies
router.post('/posts/test', jsonParser, function (req, res) {
    console.log(req.body)
    res.send("test json")
})
*/

module.exports = router;