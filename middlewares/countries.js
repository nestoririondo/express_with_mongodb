import Country from "../models/Country.js";
import { validateRegex } from "../utils/strings.js";

export const checkCode = async (req, res, next) => {
  const { code } = req.params;
  if (!code)
    return res
      .status(400)
      .json({ message: "Either alpha2Code or alpha3Code required." }); // 400 Bad Request

  if (!validateRegex(code, "alpha2Code") && !validateRegex(code, "alpha3Code"))
    return res.status(400).json({ message: "Invalid code." });

  next();
};

export const checkCountryExists = async (req, res, next) => {
  const { code } = req.params;
  const query = { $or: [{ alpha2Code: code }, { alpha3Code: code }] };

  try {
    const country = await Country.findOne(query);
    !country
      ? res.status(404).json({ message: "Country not found." })
      : ((req.country = country), next());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkCountryShouldNotExist = async (req, res, next) => {
  const { alpha2Code, alpha3Code } = req.body;
  const query = { $or: [{ alpha2Code }, { alpha3Code }] };

  try {
    const country = await Country.findOne(query);
    country
      ? res.status(400).json({ message: "Country already exists." })
      : next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkNewData = async (req, res, next) => {
  const { name, alpha2Code, alpha3Code, visited } = req.body;
  if (!name || !alpha2Code || !alpha3Code)
    return res
      .status(400)
      .json({ message: "Name, alpha2Code and alpha3Code required." }); // 400 Bad Request

  if (typeof name !== "string")
    return res.status(400).json({ message: "Name should be a string." });
  if (!validateRegex(alpha2Code, "alpha2Code"))
    return res.status(400).json({ message: "Invalid alpha2Code." });
  if (!validateRegex(alpha3Code, "alpha3Code"))
    return res.status(400).json({ message: "Invalid alpha3Code." });
  if (visited && typeof visited !== "boolean")
    return res
      .status(400)
      .json({ message: "Visited should be true or false." });

  req.country = { name, alpha2Code, alpha3Code, visited };
  next();
};
