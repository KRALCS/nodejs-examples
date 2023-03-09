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
  const perPage = 2;
  const page = req.query.page || 1;
  Post.find({}).skip((perPage * page) - perPage).limit(perPage).populate({path: 'author', model: User}).sort({$natural: -1}).lean().then(posts => {
    Post.countDocuments().lean().then(count => {
      Category.aggregate([
        {
          $lookup: {
            from: 'posts',
            localField: '_id',
            foreignField: 'category',
            as: 'posts'
          }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            num_of_posts: {$size: "$posts"}
          }
        }
      ]).then(categories  => {
        res.render("site/blog", {posts:posts, categories:categories, current: parseInt(page), pages: Math.ceil(count / perPage), messages: res.locals.messages})
      })
    })
  })
})

router.get('/contact', function (req, res) {
  res.render("site/contact")
})



module.exports = router;