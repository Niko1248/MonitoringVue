import { Schema, model } from "mongoose"

const LogsSchema = new Schema(
  {
    type: { type: String, required: true },
    subunit: { type: String, required: true },
    message: { type: String, required: true },
    username: { type: String },
  },
  {
    timestamps: true,
  }
)

const Logs = model("Logs", LogsSchema)

export default Logs
