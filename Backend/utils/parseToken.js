import jwt from "jsonwebtoken"
import Config from "../config/index.js"

function parseToken(req) {
  const token = req.headers.authorization.split(" ")[1]
  const decodedData = jwt.verify(token, Config.secret)
  return decodedData
}
export { parseToken }
