import express from 'express'
import {config} from 'dotenv'
import mongoose from "mongoose";
import router from "./router.js";
config()

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

const app = express()

app.use(express.json())
app.use('/api', router)


async function start() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => {console.log('Server Started')})
    } catch (e) {
        console.log(e)
    }
}

await start()
