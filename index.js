const postRoutes=require("./routes/post")
const express = require("express")
const mongoose = require("mongoose")
const cors=require("cors")
const app = express()
const dotenv = require("dotenv")
const userRoutes=require("./routes/user")
const { registerUser } = require("./controllers/userControllers")
dotenv.config()


const port = process.env.PORT || 8000

// use cors middleware
const corsOptions = {
    "Access-Control-Allow-Origin": "*"

}
app.use(cors(corsOptions))

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`DB connected and server running on port ${port}`)
        })
        
    })
    .catch(err => console.log(err))


app.get("/",(req, res) => {
    res.send("Walahola")
})

// parse
app.use(express.json())

// add post
app.use("/api/posts", postRoutes)

// user
app.use("/api/user", userRoutes )