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

export const deleteCountry = async (req, res) => {
  try {
    const data = await Country.findOneAndDelete(req.country);
    res.status(204).json(data); // 204 No Content
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// 5. DELETE /api/countries/:code

// This route should allow you to delete a specific country from the list (eg: remove an object from the array)

// BONUS: you’ve changed your mind; what if you segmented your countries into two categories? One that would be “already visited” and the other which would be “to visit”?

// In that case hitting the delete endpoint would just change that specific flag in your country object instead of completely removing it from the array.

// To achieve this properly; you will also need to:
// – Edit your country objects to add a visited boolean flag
// – Update your validation logic to take this into account for the POST and PUT routes
// – Edit the get all countries routes so that you can pass a visited=true query string, on top of the sorting one, to filter and return countries by their status
