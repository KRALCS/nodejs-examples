const express = require('express')
const path = require("path")
const app = express()

app.use(express.static("public"))

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'site/index.html'))
})

app.get('/blog', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'site/blog.html'))
})

app.get('/test', function (req, res) {
  res.send("TEST SAYFASI")
})

app.listen(3000)