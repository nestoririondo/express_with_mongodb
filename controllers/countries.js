import Country from "../models/Country.js";

export const getCountries = async (req, res, next) => {
  const { sort, visited } = req.query;
  try {
    const data = await Country.find(visited ? { visited } : {}).sort(
      sort ? { name: 1 } : {}
    );

    data.length > 0
      ? res.json(data)
      : res.status(404).json({ message: "No countries found." });
  } catch (error) {
    next(error);
  }
};

export const getCountriesAsData = async (visited) => {
  try {
    let data = await Country.find();

    data =
      visited === "true"
        ? data.filter((country) => country.visited === true)
        : visited === "false"
        ? data.filter((country) => country.visited === false)
        : data;

    return data;
  } catch (error) {
    return [];
  }
};

export const getCountry = async (req, res) => {
  res.json(req.country);
};

export const postCountry = async (req, res, next) => {
  try {
    const data = await Country.create(req.newCountry);
    res.status(201).json(data);
  } catch (error) {
    next(error)
  }
};

export const putCountry = async (req, res, next) => {
  try {
    const data = await Country.findOneAndUpdate(req.country, req.newCountry, {
      new: true,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const changeVisited = async (req, res, next) => {
  try {
    const data = await Country.findOneAndUpdate(
      req.country,
      { visited: !req.country.visited },
      { new: true }
    );

    res.json(data);
  } catch (error) {
    next(error);
  }
};
