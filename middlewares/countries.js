import Country from "../models/Country.js";

export const checkPostCountry = async (req, res, next) => {
  const { name, alpha2Code, alpha3Code } = req.body;
  if (!name || !alpha2Code || !alpha3Code)
    return res
      .status(400)
      .json({ message: "Name, alpha2Code and alpha3Code required." }); // 400 Bad Request

  if (!/^[A-Z]{2}$/.test(alpha2Code))
    return res.status(400).json({ message: "Invalid alpha2Code." });
  if (!/^[A-Z]{3}$/.test(alpha3Code))
    return res.status(400).json({ message: "Invalid alpha3Code." });

  req.country = { name, alpha2Code, alpha3Code };
  next();
};

export const checkCountryExists = async (req, res, next) => {
  const { name, alpha2Code, alpha3Code } = req.body;
  const countryExists = await Country.findOne({
    $or: [{ alpha2Code }, { alpha3Code }],
  });
  return countryExists
    ? res.status(409).json({ message: "Country already exists." }) // 409 Conflict
    : (req.country = { name, alpha2Code, alpha3Code } && next());
};
