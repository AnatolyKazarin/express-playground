import express from 'express'
import {config} from 'dotenv'
import mongoose from "mongoose";
import Post from "./Post.js";

config()

const PORT = process.env.PORT || 5001
const DB_URL = 'mongodb+srv://alkidkaz:11235@cluster0.h6tilai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const app = express()

app.use(express.json())

app.post('/', async (req, res) => {
    try{
        console.log(req.body)
        const {author, title, content} = req.body
        const post = await Post.create({author, title, content})
        res.json(post)
    } catch (e) {
        res.status(500).json(e)
    }
})

async function start() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => {console.log('Server Started')})
    } catch (e) {
        console.log(e)
    }
}

start().catch(e => console.log(e))
