import User from "../schemas/User.js"
import bcrypt from "bcryptjs"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import Config from "../config/index.js"
import moment from "moment-timezone"

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
  async heartbeat(req, res) {
    const username = req.body.username
    try {
      const user = await User.findOne({ username })
      if (user) {
        const currentTime = moment().tz("Europe/Moscow").toDate()
        user.lastActive = currentTime
        await user.save()
        res.status(200).send(`Активность пользователя ${username} обновлена`)
      } else {
        res.status(404).send("Пользователь не найден")
      }
    } catch (e) {}
  }
  async getActiveUsers(req, res) {
    const activeUsers = await User.find().select("username subunit roles lastActive")
    res.json(activeUsers)
  }
}

export default new AuthController()
