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
  const { first_name, last_name, email, country } = req.body;
  const newStudent = { first_name, last_name, email, country };
  try {
    const data = await Student.create(newStudent);
    res.status(201).json(data);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Provide a view that allows the user to create a new student by providing
// the name, first_name, email and country (new). The country should
// already exist in your countries collection, so you need to find a way to
// fetch the list and display it as options to select a specific country. After new
// student creation, the list of students should be updated showing the new
// student created.

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
