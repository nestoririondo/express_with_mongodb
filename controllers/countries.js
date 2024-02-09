import Country from "../models/Country.js";

export const getCountries = async (req, res) => {
  const { sort } = req.query;
  try {
    const data =
      sort === "true"
        ? await Country.find().sort({ name: 1 })
        : await Country.find();
    data.length > 0
      ? res.json(data)
      : res.status(404).json({ message: "No countries found." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCountry = async (req, res) => {};
export const putCountry = async (req, res) => {};
export const deleteCountry = async (req, res) => {};
