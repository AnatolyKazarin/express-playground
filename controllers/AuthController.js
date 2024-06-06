import Role from '../models/Role.js'
// import User from '../models/User.js'
import {User} from '../models/pgModels.js'
import bcrypt from 'bcryptjs'
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import {config} from "dotenv";
import ApiError from "../error/ApiError.js";
config()

const secret = process.env.SECRET_KEY

const generateAccessToken = (id, roles) => {
    const payload = {id, roles}
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest('Ошибка при регистрации'))
            }

            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if(candidate) {
                return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
            }
            const hashedPassword = bcrypt.hashSync(password, 7)
            // const userRole = await Role.findOne({value: "USER"})
            // const user = new User({username, password: hashedPassword, role: [userRole.value]})
            // await user.save()
            await User.create({username, password: hashedPassword})
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest("Registration error"))
        }
    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body
            const candidate = await User.findOne({ where: { username } })
            if(!candidate) {
                return next(ApiError.badRequest(`Пользователь с ${username} не найден`))
            }
            const validPassword = bcrypt.compareSync(password, candidate.password)
            if(!validPassword) {
                return next(ApiError.badRequest('Пароль не верный'))
            }
            const token = generateAccessToken(candidate._id, candidate.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Ошибка авторизации'))
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await User.findAll()
            return res.json(users)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest("Что-то пошло не так"))
        }
    }
}

export default new AuthController()
