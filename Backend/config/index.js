const PORT = 80
const DB_URL = "mongodb://192.168.0.110:27017/monitoringDB?serverSelectionTimeoutMS=5000"
const ARDUINO_URL = [{ kolibri: "http://192.168.0.115" }, { pelikan: "http://192.168.0.120" }]
const subunitList = [{ cskp: "ЦС (СУС)" }, { kolibri: "Колибри" }, { pelikan: "Пеликан" }, { unciya: "Унция" }]
const Config = {
  PORT,
  DB_URL,
  ARDUINO_URL,
  secret: "SECRET_KEY_RANDOM",
  subunitList,
}

export default Config
