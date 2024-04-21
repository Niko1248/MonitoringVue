import Logs from '../schemas/Logs.js'

class LogsController {
  async create(req, res) {
    try {
      const log = await Logs.create(req.body)
      res.json(log)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
  async getAll(req, res) {
    try {
      const logs = await Logs.find()
      return res.json(logs)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

export default new LogsController()
