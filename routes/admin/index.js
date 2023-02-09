const express = require("express");
const Category = require("../../models/Category")
const Post = require("../../models/Post")
const User = require("../../models/User")
const bodyParser = require('body-parser')
const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function (req, res) {
    res.render("admin/index")
})

router.get('/categories', function (req, res) {
    Category.find({}).sort({$natural: -1}).lean().then(categories => {
        res.render("admin/categories", {categories:categories})
    })
})

router.post('/categories', urlencodedParser, function (req, res) {
    Category.create(req.body, (error, post) => {
        if (!error) { 
            res.redirect('/admin/categories');
        }
    })
})

router.delete('/categories/:id', function (req, res) {
    Category.remove({_id: req.params.id}).then(() => {
        res.redirect("/admin/categories")
    });
})

router.get('/posts', function (req, res) {
    Post.find({}).populate({path: 'author', model: User}).populate({path: 'category', model: Category}).sort({$natural: -1}).lean().then(posts => {
        res.render("admin/posts", {posts:posts})
    })
})

router.delete('/posts/:id', function (req, res) {
    Post.remove({_id: req.params.id}).then(() => {
        res.redirect("/admin/posts")
    });
})

router.get('/posts/edit/:id', function (req, res) {
    Post.findById(req.params.id).populate({path: 'author', model: User}).lean().then(post => {
        Category.find({}).lean().then(categories  => {
            res.render("admin/postedit", {post:post, categories:categories, messages: res.locals.messages})
        })
    });
})

router.put('/posts/edit/:id', function (req, res) {
    let postImage = req.files.post_image
    let uploadPath = __dirname + '/../../public/img/postimages/' + postImage.name;
    postImage.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
    });
    Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
        category: req.body.category,
        post_image: `/img/postimages/${postImage.name}`,
    }, (error, post) => {
        if (!error) {
            res.redirect("/admin/posts");
        }
        console.log(error, post) 
    });
});

module.exports = router;