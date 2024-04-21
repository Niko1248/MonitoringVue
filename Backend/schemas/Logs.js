import { Schema, model } from 'mongoose'

const LogsSchema = new Schema(
  {
    message: { type: String, required: true }
  },
  {
    timestamps: { currentTime: () => new Date().toLocaleString() }
  }
)

const Logs = model('Logs', LogsSchema)

export default Logs
