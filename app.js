const express = require('express')
const {engine} = require('express-handlebars')
const path = require("path")
const app = express()

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


app.listen(3000)