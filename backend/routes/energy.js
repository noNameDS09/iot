const router = require('express').Router();
const energyController = require('../controllers/energyController');

// GET routes
router.get('/history', energyController.getEnergyHistory);
router.get('/top-consumers', energyController.getTopConsumers);
router.get('/hourly-usage', energyController.getHourlyUsage); // new

// POST routes
router.post('/history', energyController.insertEnergy);
router.post('/top-consumers', energyController.insertTopConsumer);
router.post('/hourly-usage', energyController.insertHourlyUsage); // new

module.exports = router;
