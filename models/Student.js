import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  first_name: { required: true, type: String },
  last_name: { required: true, type: String },
  email: {
    required: true,
    type: String,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: "Invalid email format",
    },
  },
});

const Student = mongoose.model("Student", StudentSchema);
// if I dont add a 3rd parameter, it will create a collection called plural of model
export default Student;
