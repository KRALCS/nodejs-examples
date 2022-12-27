const express = require('express')
const mongoose = require('mongoose')
const {engine} = require('express-handlebars')
const app = express()

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/nodejs').then(() => console.log('Connected!'));
app.use(express.static("public"))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views');

const main = require("./routes/main")
app.use("/", main)



app.listen(3000)