const PORT = 80
const DB_URL = "mongodb://127.0.0.1:27017/monitoringDB?serverSelectionTimeoutMS=5000"
const ARDUINO_URL = "http://192.168.0.115"

const Config = {
  PORT,
  DB_URL,
  ARDUINO_URL,
  secret: "SECRET_KEY_RANDOM",
}

export default Config
