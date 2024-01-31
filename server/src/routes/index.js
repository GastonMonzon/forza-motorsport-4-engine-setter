const { Router } = require('express');
const router = Router();

const getCars = require('../controllers/getCars');
const checkEnginesAlreadySet = require('../controllers/checkEnginesAlreadySet');
const checkCarsAlreadySet = require('../controllers/checkCarsAlreadySet');
const postCars = require('../controllers/postCars');
const postDatabases = require('../controllers/postDatabases.cjs');

router.get('/cars', getCars);
router.post('/cars/checkEngines', checkEnginesAlreadySet);
router.post('/cars/checkCars', checkCarsAlreadySet);
router.post('/cars/addEngine', postCars);
router.post('/cars/postDatabases', postDatabases);

module.exports = router;