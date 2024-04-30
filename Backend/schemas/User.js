import { Schema, model } from "mongoose"

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, required: true }],
  subunit: [{ type: String, required: true }],
})

const User = model("User", UserSchema)
export default User
