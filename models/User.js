import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { required: true, type: String },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: "Invalid email format",
    },
  },
  password: { required: true, type: String },
});

const User = mongoose.model("User", UserSchema);
// if I dont add a 3rd parameter, it will create a collection called plural of model
export default User;
