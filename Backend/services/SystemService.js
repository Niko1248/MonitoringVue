import Config from "../config/index.js"
import System from "../schemas/System.js"

class SystemService {
  async create(system) {
    const createdSystem = await System.create(system)
    return createdSystem
  }

  async getAll(token) {
    const checkSubunit = token.subunit[0]
    if (checkSubunit === "cskp") {
      const systems = await System.find()
      return systems
    }
    const systems = await System.find({ subunit: `${checkSubunit}` })
    return systems
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Не указан ID")
    }
    const system = await System.findById(number)
    return system
  }

  async update(system) {
    if (!system._id) {
      throw new Error("Не указан ID")
    }
    const updatedSystem = await System.findByIdAndUpdate(system._id, system, { new: true })
    return updatedSystem
  }
  async updateInfo(system) {
    if (!system._id) {
      throw new Error("Не указан ID")
    }
    const updatedSystem = await System.findByIdAndUpdate(
      system._id,
      { note: system.note, tract: system.tract },
      { new: true }
    )
    return updatedSystem
  }
  async delete(id) {
    if (!id) {
      throw new Error("Не указан ID")
    }
    const system = await System.findByIdAndDelete(id)
    return system
  }
}

export default new SystemService()
