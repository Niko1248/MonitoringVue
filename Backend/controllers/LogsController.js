import moment from "moment"
import Logs from "../schemas/Logs.js"

class LogsController {
  async create(req, res) {
    try {
      const logs = await Logs.create(req.body)
      res.json(logs)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
  async getAll(req, res) {
    try {
      const logs = await Logs.find()
      const formattedLogs = logs.map((log) => ({
        ...log._doc,
        createdAt: moment(log.createdAt).locale("ru").format("LLL"),
        updatedAt: moment(log.updatedAt).locale("ru").format("LLL"),
      }))
      return res.json(formattedLogs)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

export default new LogsController()
