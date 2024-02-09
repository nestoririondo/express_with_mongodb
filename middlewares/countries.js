import Country from "../models/Country.js";

const ALPHA2CODE_REGEX = /^[A-Z]{2}$/;
const ALPHA3CODE_REGEX = /^[A-Z]{3}$/;

export const checkPostCountry = async (req, res, next) => {
  const { name, alpha2Code, alpha3Code } = req.body;
  if (!name || !alpha2Code || !alpha3Code)
    return res
      .status(400)
      .json({ message: "Name, alpha2Code and alpha3Code required." }); // 400 Bad Request

  if (!ALPHA2CODE_REGEX.test(alpha2Code))
    return res.status(400).json({ message: "Invalid alpha2Code." });
  if (!ALPHA3CODE_REGEX.test(alpha3Code))
    return res.status(400).json({ message: "Invalid alpha3Code." });

  next();
};

export const checkCountryExists = (shouldExist) => async (req, res, next) => {
  const { alpha2Code, alpha3Code } = req.body || {};
  const { code } = req.params || "";

  const query =
    alpha2Code || alpha3Code
      ? { $or: [{ alpha2Code }, { alpha3Code }] }
      : { $or: [{ alpha2Code: code }, { alpha3Code: code }] };

  try {
    const country = await Country.findOne(query);
    if (shouldExist && !country)
      return res.status(404).json({ message: "Country not found." });
    if (!shouldExist && country)
      return res.status(409).json({ message: "Country already exists." });
    req.country = country;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkGetCountry = async (req, res, next) => {
  const { code } = req.params;
  if (!code)
    return res
      .status(400)
      .json({ message: "Either alpha2Code or alpha3Code required." }); // 400 Bad Request

  if (!ALPHA2CODE_REGEX.test(code) && !ALPHA3CODE_REGEX.test(code))
    return res.status(400).json({ message: "Invalid code." });

  next();
};
