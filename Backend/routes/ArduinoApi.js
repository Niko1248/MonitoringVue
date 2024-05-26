import axios from "axios"
import { compareState } from "../utils/compareState.js"
import { sendStatesToClients, sendErrorToClients, sendSuccessToClients } from "../events/index.js"
import System from "../schemas/System.js"

let arduinoState = undefined

async function readPinInfo(arduino) {
  // Адрес ардуины
  const arduinoURL = Object.values(arduino)
  // Подразделение ардуины
  const arduinoSubunit = Object.keys(arduino)
  try {
    const response = await axios.get(`${arduinoURL}/readPinInfo`)
    if (arduinoState != true) {
      arduinoState = true
      sendSuccessToClients("Соединение с Ардуино активно.")
    }
    let stateSystems = response.data
    stateSystems.map((system) => {
      // Добавляю к номеру пина подразделение, чтобы пин был уникальный
      system.pin = system.pin + arduinoSubunit
      // Добавляю название подразделение (на всякий случай, вдруг пригодится)
      system.subunit = arduinoSubunit[0]
    })
    // Функция сравнения значений состояния пинов, если что то изменилось
    let updatedStates = compareState(stateSystems)
    // Вносим изменения в БД
    if (updatedStates) {
      await Promise.all(
        updatedStates.map(async (updatedState) => {
          await System.findOneAndUpdate(
            { pin: updatedState.pin },
            { state: updatedState.state },
            { subunit: arduinoSubunit },
            { new: true }
          )
          // И отправляем через event эти изменения клиенту
          console.log(updatedState)
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
