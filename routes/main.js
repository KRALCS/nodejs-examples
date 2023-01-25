const express = require("express");
const Post = require('../models/Post')
const Category = require('../models/Category')
const User = require('../models/User')
const router = express.Router();

router.get('/', function (req, res) {
  console.log(req.session)
  res.render("site/index")
})

router.get('/blog', async function (req, res) {

  Post.find({}).populate({path: 'author', model: User}).sort({$natural: -1}).lean().then(posts => {
    Category.find({}).lean().then(categories  => {
      res.render("site/blog", {posts:posts, categories:categories, messages: res.locals.messages})
    })
  })
})
router.get('/contact', function (req, res) {
  res.render("site/contact")
})



module.exports = router;