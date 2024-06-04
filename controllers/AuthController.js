import Role from '../models/Role.js'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import {config} from "dotenv";
config()

const secret = process.env.SECRET_KEY

const generateAccessToken = (id, roles) => {
    const payload = {id, roles}
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }

            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if(candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }
            const hashedPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashedPassword, role: [userRole.value]})
            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const candidate = await Role.findOne({username})
            if(!candidate) {
                return res.status(400).json({message: `Пользователь с ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, candidate.password)
            if(!validPassword) {
                return res.status(400).json({message: `Пароль не верный`})
            }
            const token = generateAccessToken(candidate._id, candidate.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            return res.json(users)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Что-то пошло не так"})
        }
    }
}

export default new AuthController()
