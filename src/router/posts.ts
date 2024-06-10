import Router from 'express'
import PostController from "../controllers/PostController.js";

const posts = new Router()

posts.post('/posts', PostController.create)
posts.get('/posts', PostController.getAll)
posts.get('/posts/:id', PostController.getOne)
posts.put('/posts', PostController.update)
posts.delete('/posts/:id', PostController.delete)

export default posts;
