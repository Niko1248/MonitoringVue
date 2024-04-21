import { Schema, model } from "mongoose"

const SystemSchema = new Schema({
  pin: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  correspondent: { type: String, required: true },
  KMU: { type: Object, required: true },
  OMU: { type: Object, required: true },
  state: { type: String },
  payload: { type: Array },
  tract: { type: String },
  reserveList: { type: Array },
  note: { type: String },
})

const System = model("System", SystemSchema)

export default System
