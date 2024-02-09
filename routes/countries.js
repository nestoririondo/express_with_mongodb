import express from 'express';
import { getCountries, getCountry, postCountry, putCountry, deleteCountry } from '../controllers/countries.js'
import { checkPostCountry, checkCountryExists, checkGetCountry } from '../middlewares/countries.js';

const countriesRouter = express.Router();

countriesRouter.get('/', getCountries)
countriesRouter.get('/:code', checkGetCountry, checkCountryExists(true), getCountry)
countriesRouter.post('/', checkPostCountry, checkCountryExists(false), postCountry)
countriesRouter.put('/:code', putCountry)
countriesRouter.delete('/:code', deleteCountry)
// add middleware to check for code

export default countriesRouter;