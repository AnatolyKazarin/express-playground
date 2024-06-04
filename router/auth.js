import Router from 'express'
import AuthController from "../controllers/AuthController.js";
import {check} from "express-validator";

const auth = new Router()

auth.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть от 4 до 12 символов").isLength({min: 4, max: 12})
], AuthController.registration)
auth.post('/login', AuthController.login)
auth.get('/users', AuthController.getUsers)

export default auth
