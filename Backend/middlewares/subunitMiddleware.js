import jwt from "jsonwebtoken"
import Config from "../config/index.js"

export default function (subunit) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }

    try {
      const token = req.headers.authorization.split(" ")[1]
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" })
      }
      const { subunit: userSubunit } = jwt.verify(token, Config.secret)

      let hasSubunit = false
      userSubunit.forEach((item) => {
        if (subunit.includes(item)) {
          hasSubunit = true
        }
      })
      if (!hasSubunit) {
        return res.status(403).json({ message: "У вас нет доступа" })
      }
      next()
    } catch (e) {
      console.log(e)
      return res.status(403).json({ message: "Пользователь не авторизован" })
    }
  }
}
