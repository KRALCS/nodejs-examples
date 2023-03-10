const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: mongoose.SchemaTypes.ObjectId, ref:'users', required: true},
    content: {type: String, required: true},
    date: {type: Date, default: Date.now},
    category: {type: mongoose.SchemaTypes.ObjectId, ref:'categories', required: true},
    post_image: {type: String, required: true},
})

module.exports = mongoose.model("Post", PostSchema)