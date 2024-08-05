const clients = []
const arduinoStatusList = []
function eventsHandler(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  })
  res.write("\n")
  const clientData = {
    reqParams: req.query,
    res: res,
  }
  clients.push(clientData)
  req.on("close", () => {
    clients.splice(clients.indexOf(clientData), 1)
  })
}

function sendStatesToClients(stateSystems) {
  clients.forEach((client) => client.res.write(`data: ${JSON.stringify(stateSystems)}\n\n`))
}

function sendErrorToClients(message, subunit, arduinoURL) {
  const comboData = { message, subunit, arduinoURL }
  const comboDataAdmin = { message, subunit, arduinoURL, arduinoStateListFlag: true }
  clients.forEach((client) => {
    if (client.reqParams.username === subunit && client.reqParams.roles !== "ADMIN") {
      client.res.write(`data: ${JSON.stringify(comboData)}\n\n`)
    } else if (client.reqParams.roles === "ADMIN") {
      client.res.write(`data: ${JSON.stringify(comboDataAdmin)}\n\n`)
    }
  })
}

function sendSuccessToClients(message, subunit, arduinoURL) {
  const comboData = { message, subunit, arduinoURL }
  const comboDataAdmin = { message, subunit, arduinoURL, arduinoStateListFlag: true }
  clients.forEach((client) => {
    if (client.reqParams.username === subunit && client.reqParams.roles !== "ADMIN") {
      client.res.write(`data: ${JSON.stringify(comboData)}\n\n`)
    } else if (client.reqParams.roles === "ADMIN") {
      client.res.write(`data: ${JSON.stringify(comboDataAdmin)}\n\n`)
    }
  })
}
function sendArduinoStatusToClients(message, subunit, arduinoURL) {
  const comboData = { message, subunit, arduinoURL, arduinoStateListFlag: true }
  clients.forEach((client) => {
    if (client.reqParams.roles === "ADMIN") {
      client.res.write(`data: ${JSON.stringify(comboData)}\n\n`)
    }
  })
}
export { eventsHandler, sendStatesToClients, sendErrorToClients, sendSuccessToClients, sendArduinoStatusToClients }
