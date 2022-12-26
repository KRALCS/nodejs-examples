const mongoose = require('mongoose')
const Post = require('./models/Post')

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/nodejs_test').then(() => console.log('Connected!'));

/* 
// Create
Post.create({
    title: "Benim ikinci post başlığım",
    content: "ikinci postumuzun içeriği",
}, (error, post) => {
    console.log(error, post)
})

// Get All
Post.find({ }, (error, post) => {
    console.log(error, post) 
});

// Get title = "Benim ikinci post başlığım"
Post.find({
    title: "Benim ikinci post başlığım",
}, (error, post) => {
    console.log(error, post) 
});

// Find by id
Post.findById("63a9e79a08b604c45e2f4973", (error, post) => {
    console.log(error, post) 
});

// Update by id
Post.findByIdAndUpdate("63a9e631b849b72b3fed1894", {
    title: "Benim birinci post başlığım"
}, (error, post) => {
    console.log(error, post) 
});

// Delete by id
Post.findByIdAndDelete("63a9e631b849b72b3fed1894", (error, post) => {
    console.log(error, post) 
});

*/