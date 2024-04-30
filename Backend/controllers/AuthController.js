import User from "../schemas/User.js"
import bcrypt from "bcryptjs"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import Config from "../config/index.js"

const generateAccessToken = (id, roles, username, subunit) => {
  const payload = {
    id,
    roles,
    username,
    subunit,
  }
  return jwt.sign(payload, Config.secret, { expiresIn: "365d" })
}

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.errors[0].msg, errors })
      }
      const { username, password, roles, subunit } = req.body
      const candidate = await User.findOne({ username })
      if (candidate) {
        return res.status(400).json({ message: "Пользователь с таким имененем уже существует" })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const user = new User({ username, password: hashPassword, roles, subunit })
      await user.save()
      return res.status(200).json({ message: "Пользователь успешно зарегистрирован" })
    } catch (e) {
      res.status(400).json({ message: "Registration error" })
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      console.log(username)
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${username} не найден` })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: "Введен неверный пароль" })
      }
      const token = generateAccessToken(user._id, user.roles, user.username, user.subunit)
      return res.json({ token })
    } catch (e) {
      res.status(400).json({ message: "Login error" })
    }
  }
}

export default new AuthController()
