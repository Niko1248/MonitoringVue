import SystemService from "../services/SystemService.js"

class SystemController {
  async create(req, res) {
    try {
      const system = await SystemService.create(req.body)
      res.json(system)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async getAll(req, res) {
    try {
      const systems = await SystemService.getAll()
      return res.json(systems)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async getOne(req, res) {
    try {
      const system = await SystemService.getOne(req.params.id)
      return res.json(system)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async update(req, res) {
    try {
      const updatedSystem = await SystemService.update(req.body)
      return res.json(updatedSystem)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
  async delete(req, res) {
    try {
      const system = await SystemService.delete(req.params.id)
      return res.json(system)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

export default new SystemController()
