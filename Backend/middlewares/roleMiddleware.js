import jwt from "jsonwebtoken"
import Config from "../config/index.js"

export default function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }

    try {
      const token = req.headers.authorization.split(" ")[1]
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" })
      }
      const { roles: userRoles } = jwt.verify(token, Config.secret)
      let hasRole = false
      console.log(roles)
      console.log(userRoles)
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true
        }
      })
      if (!hasRole) {
        return res.status(403).json({ message: "У вас нет доступа" })
      }
      next()
    } catch (e) {
      console.log(e)
      return res.status(403).json({ message: "Пользователь не авторизован" })
    }
  }
}
