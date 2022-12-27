const express = require("express");
const router = express.Router();

router.get('/', function (req, res) {
  res.render("site/index")
})
router.get('/about', function (req, res) {
  res.render("site/about")
})
router.get('/blog', function (req, res) {
  res.render("site/blog")
})
router.get('/contact', function (req, res) {
  res.render("site/contact")
})
router.get('/login', function (req, res) {
  res.render("site/login")
})
router.get('/register', function (req, res) {
  res.render("site/register")
})
router.get('/posts/new', function (req, res) {
  res.render("site/addpost")
})
router.post('/posts/test', function (req, res) {
  res.send("test ok")
})

module.exports = router;