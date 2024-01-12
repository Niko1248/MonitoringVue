import { Schema, model } from "mongoose"

const SystemSchema = new Schema({
  pin: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  correspondent: { type: String, required: true },
  KMU: { type: String, required: true },
  state: { type: String, default: "В работе" },
  payload: { type: Array },
  tract: { type: String, required: true },
  reserveList: { type: Array },
})

const System = model("System", SystemSchema)

export default System
