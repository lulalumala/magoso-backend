const express = require("express");
const router = express.Router();
const {addPost, getPosts, getPost, deletePost, updatePost}=require("../controllers/postControllers")

// get
// router.get("/posts", (req, res) => {
//     res.send("These are posts")
// })

// : param
 
// post
router.post("/new", addPost)

// Get all posts
router.get("/", getPosts)

// Get a single post
router.get("/:id", getPost)

// Delete
router.delete("/:id", deletePost)

 
// Update
router.patch("/:id", updatePost)





module.exports = router