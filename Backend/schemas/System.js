import mongoose from "mongoose"

const SystemSchema = new mongoose.Schema({
  number: { type: String, required: true },
  correspondent: { type: String, required: true },
  KMU: { type: String, required: true },
  payload: { type: Array },
  reserveList: { type: Array },
})

const System = mongoose.model("System", SystemSchema)
// const changeStream = System.watch()
// changeStream.on("change", (change) => {
//   console.log("Change detected:", change)
// })

export default System
