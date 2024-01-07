import mongoose from "mongoose"

const LogsSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
  },
  {
    timestamps: { currentTime: () => new Date().toLocaleString() },
  }
)

const Logs = mongoose.model("Logs", LogsSchema)

export default Logs
