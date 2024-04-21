import axios from "axios"
import Config from "../config/index.js"
import { compareState } from "../utils/compareState.js"
import { sendStatesToClients, sendErrorToClients, sendSuccessToClients } from "../events/index.js"
import System from "../schemas/System.js"

let arduinoState = undefined

async function readPinInfo() {
  try {
    const response = await axios.get(`${Config.ARDUINO_URL}/readPinInfo`)
    if (arduinoState != true) {
      console.log("test")
      arduinoState = true
      sendErrorToClients("Соединение с Ардуино активно.")
    }
    let stateSystems = response.data
    let updatedStates = compareState(stateSystems)
    if (updatedStates) {
      await Promise.all(
        updatedStates.map(async (updatedState) => {
          await System.findOneAndUpdate({ pin: updatedState.pin }, { state: updatedState.state }, { new: true })
          sendStatesToClients(updatedState)
        })
      )
    }
  } catch (e) {
    if (e.code === "ETIMEDOUT") {
      if (arduinoState != false) {
        arduinoState = false
        sendErrorToClients(`Соединение с Ардуино по IP-адресу ${e.address}:${e.port} отсутствует.`)
      }

      console.log(`Соединение с Ардуино по IP-адресу ${e.address}:${e.port} отсутствует.`)
    } else {
      console.log(e)
    }
  }
}

export { readPinInfo }
