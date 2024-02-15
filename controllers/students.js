import Student from "../models/Student.js";

export const getStudents = async (req, res) => {
  try {
    const data = await Student.find();
    console.log(req.user)
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postStudent = async (req, res) => {
  const { first_name, last_name, email, country } = req.body;
  const newStudent = { first_name, last_name, email, country };
  console.log("trying to post student")
  try {
    const data = await Student.create(newStudent);
    res.status(201).json(data);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateJohn = async (req, res) => {
  try {
    const data = await Student.updateMany(
      { first_name: "John" },
      { first_name: "Bob" }
    );
    data.modifiedCount === 0
      ? res.status(404).json({ message: "No John found" })
      : res.status(200).json(data);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await Student.findByIdAndDelete({ _id: id });
    res.json(data);
  } catch (error) {
    next(error);
  }
};
