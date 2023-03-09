const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const MongoStore = require('connect-mongo');
const helpers = require('./helpers/all')
const {engine} = require('express-handlebars')
const expressSession = require('express-session')

const methodOverride = require('method-override')

const app = express()

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/nodejs').then(() => console.log('Connected!'));

app.use(expressSession({
    secret: "CSCSCSCS",
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        secure: false, // true = Https, false = Http
        httpOnly: true,
        sameSite: 'none',
        maxAge: null
    },
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/nodejs' }) // npm restart olunca sessionlar sıfırlanıyor. bunu çözmek için sessionları mongodbde tutmak gerekiyor
}))

app.use(fileUpload())
app.use(express.static("public"))
app.use(methodOverride("_method"))

// Display links Middleware
const displayLinks = (req, res, next) => {
    const user = req.session.user;
    if(user) {
        console.log("Oturum Açık: " + user.email);
        res.locals.displayLinks = true
    } else {
        res.locals.displayLinks = false
    }
    next() // Middleware içindeki işlemler bitince sayfa açılışını sağlamak için kullanılır.
}

app.use("/", displayLinks)

// Flash Message Middleware
app.use((req, res, next) => {
    res.locals.messages = req.session.flash;
    delete req.session.flash;
    next();
})

// Handlebars helpers
app.engine('handlebars', engine({
    helpers:{
        generateDate: helpers.generateDate, 
        setSelectedItem: helpers.setSelectedItem,
        limit: helpers.limit,
        truncate: helpers.truncate,
        pagination: helpers.pagination,
    }
}))
app.set('view engine', 'handlebars')
app.set('views', './views');

const main = require("./routes/main")
const posts = require("./routes/posts")
const users = require("./routes/users")
const admin = require("./routes/admin/index")
app.use("/", main)
app.use("/posts", posts)
app.use("/users", users)
app.use("/admin", admin)

app.listen(3000)