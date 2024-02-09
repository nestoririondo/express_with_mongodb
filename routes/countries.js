import express from 'express';
import { getCountries, getCountry, postCountry, putCountry, changeVisited } from '../controllers/countries.js'
import { checkNewData, checkCountryShouldNotExist, checkCountryExists, checkCode } from '../middlewares/countries.js';

const countriesRouter = express.Router();

countriesRouter.get('/', getCountries)
countriesRouter.get('/:code', checkCode, checkCountryExists, getCountry)
countriesRouter.post('/', checkNewData, checkCountryShouldNotExist, postCountry)
countriesRouter.put('/:code', checkCode, checkNewData, checkCountryExists, putCountry)
countriesRouter.delete('/:code', checkCode, checkCountryExists, changeVisited)

export default countriesRouter;