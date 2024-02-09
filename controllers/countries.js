import Country from "../models/Country.js";

export const getCountries = async (req, res) => {
  const { sort, visited } = req.query;
  try {
    let data =
      sort === "true"
        ? await Country.find().sort({ name: 1 })
        : await Country.find();

    data =
      visited === "true"
        ? data.filter((country) => country.visited === true)
        : visited === "false"
        ? data.filter((country) => country.visited === false)
        : data;

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
    const data = await Country.create(req.country);
    res.status(201).json(data); // 201 Created
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const putCountry = async (req, res) => {
  try {
    const data = await Country.findOneAndUpdate(req.country, req.body, {
      new: true,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const changeVisited = async (req, res) => {
  try {
    const data = await Country.findOneAndUpdate(
      { _id: req.country._id },
      { visited: !req.country.visited },
      { new: true }
    );

    res.json(data); // 204 No Content
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
