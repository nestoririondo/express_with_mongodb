import express from 'express';
import { getCountries, getCountry, postCountry, putCountry, deleteCountry } from '../controllers/countries.js'
import { checkPostCountry, checkCountryShouldNotExist, checkCountryExists, checkCode } from '../middlewares/countries.js';

const countriesRouter = express.Router();

countriesRouter.get('/', getCountries)
countriesRouter.get('/:code', checkCode, checkCountryExists, getCountry)
countriesRouter.post('/', checkPostCountry, checkCountryShouldNotExist, postCountry)
countriesRouter.put('/:code', checkCode, checkPostCountry, checkCountryExists, putCountry)
countriesRouter.delete('/:code', deleteCountry)
// add middleware to check for code

export default countriesRouter;