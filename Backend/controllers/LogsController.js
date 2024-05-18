import moment from "moment"
import Logs from "../schemas/Logs.js"
import { formatDate } from "../utils/formatDate.js"

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
  async getAll(req, res) {
    try {
      const logs = await Logs.find()
      const formattedLogs = formatDate(logs)
      // const formattedLogs = logs.map((log) => ({
      //   ...log._doc,
      //   createdAt: moment(log.createdAt).locale("ru").format("DD.MM.YYYY HH:mm:ss"),
      //   updatedAt: moment(log.updatedAt).locale("ru").format("DD.MM.YYYY HH:mm:ss"),
      // }))
      return res.json(formattedLogs)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

export default new LogsController()
