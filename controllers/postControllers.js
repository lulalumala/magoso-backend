const { default: mongoose } = require("mongoose")
const Post = require("../models/post")

// adding post controller
const addPost = async (req, res) => {
    try {

        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            body: req.body.body,
            comments: req.body.comments,
            author: req.body.author,
            image: req.body.image,
            category: req.body.category,
            tags: req.body.tags,
            topPost: req.body.topPost
        })
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.json(error)
    }
}

// getting post controller
const getPosts = async (req, res) => {
    try {
        const allPost = await Post.find()
        return res.status(200).json(allPost)
    }
    catch (error) {
        console.log(error)
        res.json(error)
    }
}

// getting single post
const getPost = async (req, res) => {
    try {

        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.json({ error: "Invalid Post ID" })
        }
        const onePost = await Post.findById(id)
        if (!onePost) {
            return res.json({ error: "No such post" })
        } else {

            return res.status(200).json(onePost)
        }

    } catch (error) {
        res.json(error)
    }
}

// delete post
const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.json({ error: "invalid post id" })
        }
        const postToDelete = await Post.findByIdAndDelete(id)
        if (!postToDelete) {
            return res.json({ error: "No such post" })
        }
        return res.status(200).json(postToDelete)
    } catch (error) {
        res.json(error)
    }
}

// update post
const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.json({ error: "Invalid update id" })
        }
        const postToUpdate = await Post.findByIdAndUpdate(id, { ...req.body })
        if (!postToUpdate) {
            return res.json({ error: "No such post" })
        }
        return res.status(200).json(postToUpdate)
    }
    catch (error) {
        return res.json(error)
    }
}



module.exports = { addPost, getPosts, getPost, deletePost, updatePost}