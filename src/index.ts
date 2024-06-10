import express from 'express'
import {config} from 'dotenv'
import mongoose from "mongoose";
import posts from "./router/posts.js";
import auth from "./router/auth.js";
import sequelize from '../db.js'
import {User} from './models/pgModels.js'
import cors from 'cors'
import errorMiddleware from "./middlewares/errorMiddleware.js";
config()

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', posts)
app.use('/auth', auth)
app.use(errorMiddleware)


async function start() {
    try {
        // await mongoose.connect(DB_URL)
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {console.log('Server Started')})
    } catch (e) {
        console.log(e)
    }
}

await start()
