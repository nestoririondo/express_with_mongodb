import Country from "../models/Country.js";

export const checkCode = async (req, res, next) => {
  const { code } = req.params;
  if (!code)
    return res
      .status(400)
      .json({ message: "Either alpha2Code or alpha3Code required." });

  next();
};

export const checkCountryExists = async (req, res, next) => {

  if (req.method === "GET" || req.method === "DELETE" || req.method === "PUT") {
    const { code } = req.params;
    const query = {$or: [{alpha2Code: code.toUpperCase()}, {alpha3Code: code.toUpperCase()}]};
    try {
      const country = await Country.findOne(query);
      return !country
        ? res.status(404).json({ message: "Country not found." })
        : ((req.country = country), next());
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "POST") {
    const { alpha2Code, alpha3Code } = req.body;
    const query = { $or: [{ alpha2Code }, { alpha3Code }] };
    try {
      const country = await Country.findOne(query);
      return !country
        ? next()
        : res.status(409).json({ message: "Country already exists." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const checkNewData = async (req, res, next) => {
  const { name, alpha2Code, alpha3Code, visited } = req.body;
  if (!name || !alpha2Code || !alpha3Code)
    return res
      .status(400)
      .json({ message: "Name, alpha2Code and alpha3Code required." }); 

  if (typeof name !== "string")
    return res.status(400).json({ message: "Name should be a string." });

  if (visited && typeof visited !== "boolean")
    return res
      .status(400)
      .json({ message: "Visited should be true or false." });

  req.newCountry = { name, alpha2Code, alpha3Code, visited };

  next();
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
};