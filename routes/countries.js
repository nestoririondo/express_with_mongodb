import express from 'express';
import { getCountries, getCountry, putCountry, deleteCountry } from '../controllers/countries.js'

const countriesRouter = express.Router();

countriesRouter.get('/', getCountries)
countriesRouter.get('/:code', getCountry)
countriesRouter.put('/:code', putCountry)
countriesRouter.delete('/:code', deleteCountry)
// add middleware to check for code

export default countriesRouter;