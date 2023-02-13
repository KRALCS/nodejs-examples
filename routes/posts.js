const express = require("express");
const bodyParser = require('body-parser')
const Post = require('../models/Post')
const Category = require('../models/Category')
const User = require('../models/User')
const helpers = require('../helpers/all')
const router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/new', function (req, res) {
    if (req.session.user) {
        Category.find({}).lean().then(categories => {
            res.render("site/addpost", { categories: categories })
        });
    } else {
        res.redirect("/users/login")
    }
})

router.post('/new', urlencodedParser, function (req, res) {
    let postImage = req.files.post_image
    uploadPath = __dirname + '/../public/img/postimages/' + postImage.name;
    postImage.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
    });
    Post.create({
        ...req.body,
        post_image: `/img/postimages/${postImage.name}`,
        author: req.session.user._id
    }, (error, post) => {
        req.session.flash = {
            type: "alert alert-success",
            message: "Post ekleme işlemi başarılı",
        }
        req.session.save(function (err) {
            if (err) {
                console.log(err)
            }
        })
        console.log(error, post)
    })
    res.redirect('/blog');
})

router.get('/search', function (req, res) {
    if (req.query.search) {
        const regex = new RegExp(helpers.escapeRegex(req.query.search), 'gi');
        Post.find({ "title": regex }).populate({path: 'author', model: User}).sort({$natural: -1}).lean().then(posts => {
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
              res.render("site/blog", {posts:posts, categories:categories, messages: res.locals.messages, query: req.query.search})
            })
        })
    } else {
        res.redirect('/blog');
    }
})

router.get('/category/:categoryId', (req, res) => {
    Post.find({ category: req.params.categoryId }).populate({ path: 'category', model: Category }).populate({path: 'author', model: User}).sort({$natural: -1}).lean().then(posts => {
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
                    num_of_posts: { $size: "$posts" }
                }
            }
        ]).then(categories => {
            res.render("site/blog", {posts:posts, categories:categories, messages: res.locals.messages})
        })
    });
});

router.get('/:id', function (req, res) {
    Post.findById(req.params.id).populate({ path: 'author', model: User }).lean().then(post => {
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
                    num_of_posts: { $size: "$posts" }
                }
            }
        ]).then(categories => {
            Post.find({}).sort({ $natural: -1 }).lean().then(posts => {
                res.render("site/post", { post: post, categories: categories, posts: posts, messages: res.locals.messages })
            })
        })
    });

})


/* POST /api/users gets JSON bodies
router.post('/posts/test', jsonParser, function (req, res) {
    console.log(req.body)
    res.send("test json")
})
*/

module.exports = router;