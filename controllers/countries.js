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
      : res.status(404).json({ message: "No countries found." }); // 404 Not Found
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message }); // 500 Internal Server Error
  }
};

export const getCountry = async (req, res) => {
  res.json(req.country);
};

export const postCountry = async (req, res) => {
  try {
    const data = Country.create(req.country);
    res.status(201).json(data); // 201 Created
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const putCountry = async (req, res) => {
  try {
    const data = await Country.findOneAndUpdate(req.country, req.body, { new: true });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteCountry = async (req, res) => {};

// 4. PUT /api/countries/:code

// This route should accept edits to an existing country in the list (eg: edit an object inside the countries array).

// BONUS: Check if the country is in your list before allowing edition.

// BONUS 2: Validate the data you receive before updating the country. Can you make it so that you use the same validation logic that for the POST route, without duplicating your code?
