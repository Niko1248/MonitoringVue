const clients = []

function eventsHandler(req, res) {
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
}

function sendStatesToClients(stateSystems) {
  clients.forEach((client) => client.write(`data: ${JSON.stringify(stateSystems)}\n\n`))
}

function sendErrorToClients(error) {
  clients.forEach((client) => client.write(`data: ${JSON.stringify(error)}\n\n`))
}

function sendSuccessToClients(success) {
  clients.forEach((client) => client.write(`data: ${JSON.stringify(success)}\n\n`))
}
export { eventsHandler, sendStatesToClients, sendErrorToClients, sendSuccessToClients }
