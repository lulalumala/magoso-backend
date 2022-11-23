const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
    title: {
        type:String, required:true
    },
    description: {
        type: String, required: true
    },
    body: {
        type:String, required:true
    },
    comments: {
        type:String
    },
    author: {
        type:String, required: true
    },
  
    image: {
        type:String, required:true
    },
    category: {
        type: String, required: true
    },
    tags: {
        type:Array
    },

    topPost: {
    type: Boolean, default: false
}

}, {timestamps:true})

module.exports=mongoose.model("Post", postSchema)