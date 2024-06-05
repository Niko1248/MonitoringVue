const PORT = 80
const DB_URL = "mongodb://127.0.0.1:27017/monitoringDB?serverSelectionTimeoutMS=5000"
const ARDUINO_PULLING_TIME = 5000 //в милисекундах
const ARDUINO_URL = [{ Колибри: "http://192.168.0.115" }, { Пеликан: "http://192.168.0.120" }]

const subunitList = [{ cskp: "ЦС (СУС)" }, { kolibri: "Колибри" }, { pelikan: "Пеликан" }, { unciya: "Унция" }]
const Config = {
  PORT,
  DB_URL,
  ARDUINO_URL,
  secret: "SECRET_KEY_RANDOM",
  subunitList,
  ARDUINO_PULLING_TIME,
}

export default Config
