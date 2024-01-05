import mongoose from "mongoose"

const SystemSchema = new mongoose.Schema({
  pin: { type: String, required: true },
  number: { type: String, required: true },
  correspondent: { type: String, required: true },
  KMU: { type: String, required: true },
  state: { type: String, default: "В работе" },
  payload: { type: Array },
  reserveList: { type: Array },
})

const System = mongoose.model("System", SystemSchema)

export default System
