import express from 'express';
import { getCountries, getCountry, postCountry, putCountry, deleteCountry } from '../controllers/countries.js'
import { checkNewData, checkCountryExists, errorHandler } from '../middlewares/countries.js';
import { authenticate } from '../middlewares/users.js'

const countriesRouter = express.Router();
  
countriesRouter.get('/api', authenticate, getCountries, errorHandler)
countriesRouter.get('/api/:code', authenticate, checkCountryExists, getCountry)
countriesRouter.post('/api', authenticate, checkNewData, checkCountryExists, postCountry, errorHandler)
countriesRouter.put('/api/:code', authenticate, checkNewData, checkCountryExists, putCountry, errorHandler)
countriesRouter.delete('/api/:code', authenticate, checkCountryExists, deleteCountry, errorHandler)
  
export default countriesRouter;
