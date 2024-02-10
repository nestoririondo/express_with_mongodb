import express from 'express';
import { getCountries, getCountry, postCountry, putCountry, changeVisited } from '../controllers/countries.js'
import { checkNewData, checkCountryExists, errorHandler } from '../middlewares/countries.js';

const countriesRouter = express.Router();

countriesRouter.get('/', async (req, res) => {
    const countries = await getCountries();
    res.render('pages/index', { countries });
});

countriesRouter.get('/add', (req, res) => {
    res.render('pages/add');
});
  
countriesRouter.get('/api', getCountries, errorHandler)
countriesRouter.get('/api/:code', checkCountryExists, getCountry)
countriesRouter.post('/api', checkNewData, checkCountryExists, postCountry, errorHandler)
countriesRouter.put('/api/:code', checkNewData, checkCountryExists, putCountry, errorHandler)
countriesRouter.delete('/api/:code', checkCountryExists, changeVisited, errorHandler)
  
export default countriesRouter;
