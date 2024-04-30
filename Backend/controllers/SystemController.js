import { validationResult } from "express-validator"
import SystemService from "../services/SystemService.js"
import jwt from "jsonwebtoken"
import Config from "../config/index.js"

class SystemController {
  async create(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.errors[0].msg, errors })
      }
      const system = await SystemService.create(req.body)
      res.status(200).json({ message: "Система успешно добавлена", system })
    } catch (e) {
      console.log(e)
      if (e.code === 11000) {
        const value = Object.values(e.keyValue)[0]
        res.status(409).json({ message: `Pin № ${value} уже используется` })
      } else {
        res.status(500).json(e.message)
      }
    }
  }

  async getAll(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      const decodedData = jwt.verify(token, Config.secret)
      const systems = await SystemService.getAll(decodedData)
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
  async updateInfo(req, res) {
    try {
      const updatedSystem = await SystemService.updateInfo(req.body)
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
