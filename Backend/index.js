import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import router from "./routers/index.js"
import System from "./schemas/System.js"
import axios from "axios"
const app = express()
const PORT = 80
const DB_URL =
  "mongodb://192.168.0.110:27017,192.168.0.110:27018,192.168.0.110:27019/monitoringDB?replicaSet=rs0&serverSelectionTimeoutMS=5000"

app.use(express.json())
app.use(cors())
app.use("/api", router)

const changeStream = System.watch()
changeStream.on("change", (change) => {
  if (change) {
    console.log("Change detected:", change)
  } else {
    console.log("None")
  }
})
let oldStateSystems = null

function compareState(newStateSystems) {
  let changeStateArray = []
  if (oldStateSystems === null) {
    oldStateSystems = newStateSystems
    return
  }
  newStateSystems.forEach((newState, idx) => {
    if (oldStateSystems[idx].state !== newState.state) {
      console.log(`State of system ${newState.pin} changed from ${oldStateSystems[idx].state} to ${newState.state}`)
      console.log(newState)
      changeStateArray.push(newState)
    }
  })
  if (changeStateArray.length != 0) {
    oldStateSystems = newStateSystems
    console.log(changeStateArray)
    return changeStateArray
  } else {
    return
  }
}
const clients = []
app.get("/state", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  })
  res.write("\n")
  clients.push(res)
  req.on("close", () => {
    clients.splice(clients.indexOf(res), 1)
  })
})
function sendStatesToClients(stateSystems) {
  clients.forEach((client) => client.write(`data: ${JSON.stringify(stateSystems)}\n\n`))
}
async function readPinInfo() {
  try {
    const response = await axios.get("http://192.168.0.115:80/readPinInfo")
    let stateSystems = response.data
    let test = compareState(stateSystems)
    if (test) {
      await Promise.all(
        test.map(async (updatedState) => {
          await System.findOneAndUpdate({ pin: updatedState.pin }, { state: updatedState.state }, { new: true })
          sendStatesToClients(updatedState)
        })
      )
    }
  } catch (e) {
    console.log(e)
  }
}

async function startApp() {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

startApp()
setInterval(readPinInfo, 3000)
