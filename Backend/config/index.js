const PORT = 80
const DB_URL = "mongodb://192.168.0.110:27017/monitoringDB?serverSelectionTimeoutMS=5000"
const ARDUINO_PULLING_TIME = 5000 //в милисекундах
const ARDUINO_URL = [
  { Колибри: "http://192.168.0.115" },
  { Пеликан: "http://192.168.0.120" },
  { Унция: "http://192.168.0.121" },
]

const subunitList = [
  { gcs: "14 ГЦС" },
  { cskp: "ЦС (СУС)" },
  { kolibri: "Колибри" },
  { brus: "Брус" },
  { pelikan: "Пеликан" },
  { unciya: "Унция" },
  { pulsator: "Пульсатор" },
  { seliger: "Селигер" },
]
const Config = {
  PORT,
  DB_URL,
  ARDUINO_URL,
  secret: "SECRET_KEY_RANDOM",
  subunitList,
  ARDUINO_PULLING_TIME,
}

export default Config
