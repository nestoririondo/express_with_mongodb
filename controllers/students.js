import Student from "../models/Student.js";

export const getStudents = async (req, res) => {
  try {
    const data = await Student.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postStudent = async (req, res) => {
  const { first_name, last_name, email } = req.body;
  const newStudent = {};
  if (first_name) newStudent.first_name = first_name;
  if (last_name) newStudent.last_name = last_name;
  if (email) newStudent.email = email;
  try {
    const data = await Student.create(newStudent);
    res.status(201).json(data);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// export const updateJohn = async (req, res) => {
//   try {
//     const data = await Student.find({ first_name: "John" });
//     const arrayOfPromises = data.map((john) =>
//       Student.findByIdAndUpdate(john._id, { first_name: "Bob" }, { new: true })
//     );
//     const results = await Promise.all(arrayOfPromises);
//     results.length === 0
//       ? res.status(404).json({ message: "No John found" })
//       : res.status(200).json(results);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

export const updateJohn = async (req, res) => {
  try {
    const data = await Student.updateMany(
      { first_name: "John" },
      { first_name: "Bob" },
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
