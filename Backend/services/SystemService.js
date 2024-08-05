import System from "../schemas/System.js"
import { translateSubunit } from "../utils/translateSubunit.js"

class SystemService {
  async create(system) {
    const regex = /^[А-Яа-яЁё]+$/
    const isOnlyRussianLetters = regex.test(system.subunit)
    if (!isOnlyRussianLetters) {
      system.subunit = translateSubunit(system.subunit)
    }
    system.pin = system.pin + system.subunit
    const createdSystem = await System.create(system)
    return createdSystem
  }

  async getAll(token) {
    const checkSubunit = translateSubunit(token.subunit[0])
    if (checkSubunit === "14 ГЦС") {
      const systems = await System.find()
      return systems
    } else if (checkSubunit === "ЦС (СУС)") {
      const systems = await System.find({ subunit: { $in: ["Колибри", "Брус", "Пеликан", "Унция"] } })
      return systems
    } else {
      const systems = await System.find({ subunit: `${checkSubunit}` })
      return systems
    }
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
    console.log(system)
    const regex = /^[А-Яа-яЁё]+$/
    const isOnlyRussianLetters = regex.test(system.subunit)
    if (!isOnlyRussianLetters) {
      system.subunit = translateSubunit(system.subunit)
    }
    system.pin = system.pin + system.subunit
    const updatedSystem = await System.findByIdAndUpdate(system._id, system, { new: true })
    console.log(updatedSystem)
    return updatedSystem
  }
  async updateInfo(system) {
    if (!system._id) {
      throw new Error("Не указан ID")
    }
    const updatedSystem = await System.findByIdAndUpdate(
      system._id,
      { note: system.note, selectedNameTract: system.activeTract },
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
