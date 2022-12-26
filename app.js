const express = require('express')
const mongoose = require('mongoose')
const {engine} = require('express-handlebars')
const path = require("path")
const app = express()

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/nodejs').then(() => console.log('Connected!'));

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views');

app.use(express.static("public"))

app.get('/', function (req, res) {
  res.render("site/index")
})
app.get('/about', function (req, res) {
  res.render("site/about")
})
app.get('/blog', function (req, res) {
  res.render("site/blog")
})
app.get('/contact', function (req, res) {
  res.render("site/contact")
})
app.get('/login', function (req, res) {
  res.render("site/login")
})
app.get('/register', function (req, res) {
  res.render("site/register")
})


app.listen(3000)