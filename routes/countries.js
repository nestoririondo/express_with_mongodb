import express from 'express';
import { getCountries, getCountry, postCountry, putCountry, changeVisited } from '../controllers/countries.js'
import { checkNewData, checkCountryShouldNotExist, checkCountryExists, checkCode } from '../middlewares/countries.js';
import {getCountriesAsData} from '../controllers/countries.js'

const countriesRouter = express.Router();

countriesRouter.get('/', async (req, res) => {
    const countries = await getCountriesAsData('false');
    res.render('pages/index', { countries });
});

countriesRouter.get('/add', (req, res) => {
    res.render('pages/add');
});
  
countriesRouter.get('/api', getCountries)
countriesRouter.get('/api/:code', checkCode, checkCountryExists, getCountry)
countriesRouter.post('/api', checkNewData, checkCountryShouldNotExist, postCountry)
countriesRouter.put('/api/:code', checkCode, checkNewData, checkCountryExists, putCountry)
countriesRouter.delete('/api/:code', checkCode, checkCountryExists, changeVisited)
  
export default countriesRouter;