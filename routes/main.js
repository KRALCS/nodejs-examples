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

module.exports = router;