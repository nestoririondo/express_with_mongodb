import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: { required: true, type: String },
  alpha2Code: { required: true, type: String },
  alpha3Code: { required: true, type: String },
  visited: { type: Boolean, default: false }
});
// add validators for codes

const Country = mongoose.model("Country", countrySchema, "countries")

export default Country;