import { Schema, model } from "mongoose"

const SystemSchema = new Schema(
  {
    pin: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    correspondent: { type: String, required: true },
    KMU: { type: Object, required: true },
    OMU: { type: Object, required: true },
    subunit: { type: String },
    state: { type: String },
    payload: { type: Array },
    tracts: { type: Array },
    selectedNameTract: { type: String },
    note: { type: String },
  },
  {
    timestamps: true,
  }
)

const System = model("System", SystemSchema)

export default System
