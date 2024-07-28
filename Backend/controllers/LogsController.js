import Logs from "../schemas/Logs.js"
import User from "../schemas/User.js"
import bcrypt from "bcryptjs"
import { formatDate } from "../utils/formatDate.js"
import { parseToken } from "../utils/parseToken.js"
import { translateSubunit } from "../utils/translateSubunit.js"

class LogsController {
  async create(req, res) {
    try {
      const logs = await Logs.create(req.body)
      const formattedLogs = formatDate(logs)
      res.json(formattedLogs)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
  async createSystemStatus(req, res) {
    try {
      const { subunit, message } = req.body
      const threeSecondsAgo = new Date(Date.now() - 3 * 1000)
      const findMessage = await Logs.findOne({
        subunit,
        message,
        createdAt: { $gte: threeSecondsAgo },
      })
      if (!findMessage) {
        const logs = await Logs.create(req.body)
        const formattedLogs = formatDate(logs)
        res.json(formattedLogs)
      } else {
        const formattedLogs = formatDate(findMessage)
        res.json(formattedLogs)
      }
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
  async getAll(req, res) {
    try {
      const token = parseToken(req)
      const checkSubunit = translateSubunit(token.subunit[0])
      if (checkSubunit === "ЦС (СУС)") {
        const logs = await Logs.find()
        const formattedLogs = formatDate(logs)
        return res.json(formattedLogs)
      } else {
        const logs = await Logs.find({ subunit: checkSubunit })
        const formattedLogs = formatDate(logs)
        return res.json(formattedLogs)
      }
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
  async deleteLogs(req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json("Введен неверный пароль")
      }
      await Logs.deleteMany({})
      res.status(200).json("Лог файл удалён")
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

export default new LogsController()
