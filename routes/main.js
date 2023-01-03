const express = require("express");
const Post = require('../models/Post')
const router = express.Router();

router.get('/', function (req, res) {
  res.render("site/index")
})
router.get('/about', function (req, res) {
  res.render("site/about")
})
router.get('/blog', async function (req, res) {
  Post.find({}).lean().then(posts => {
    res.render("site/blog", {posts:posts})
  })
})
router.get('/contact', function (req, res) {
  res.render("site/contact")
})



module.exports = router;