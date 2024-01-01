import mongoose from "mongoose"

const System = new mongoose.Schema({
  number: { type: String, required: true },
  correspondent: { type: String, required: true },
  KMU: { type: String, required: true },
  payload: { type: Array },
  reserveList: { type: Array },
})

export default mongoose.model("System", System)
