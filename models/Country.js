import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: { required: true, type: String },
  alpha2Code: { required: true, type: String, match: /^[A-Z]{2}$/ },
  alpha3Code: { required: true, type: String, match: /^[A-Z]{3}$/ },
  visited: { type: Boolean, default: false },
});

const Country = mongoose.model("Country", countrySchema, "countries");

export default Country;
