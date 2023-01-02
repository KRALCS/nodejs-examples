const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const generateDate = require('./helpers/generateDate').generateDate
const {engine} = require('express-handlebars')
const app = express()

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/nodejs').then(() => console.log('Connected!'));

app.use(fileUpload())
app.use(express.static("public"))


app.engine('handlebars', engine({helpers:{generateDate:generateDate}}))
app.set('view engine', 'handlebars')
app.set('views', './views');

const myMiddleware = (req, res, next) => {
    console.log("Middleware")
    next() // Middleware içindeki işlemler bitince sayfa açılışını sağlamak için kullanılır.
}

app.use("/", myMiddleware)

const main = require("./routes/main")
const posts = require("./routes/posts")
app.use("/", main)
app.use("/posts", posts)

app.listen(3000)