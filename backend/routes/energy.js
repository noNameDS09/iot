const express = require('express');
const router = express.Router();
const energyController = require('../controllers/energyController');

// GET routes
router.get('/history', energyController.getEnergyHistory);
router.get('/top-consumers', energyController.getTopConsumers);

// POST routes
router.post('/history', energyController.insertEnergy);
router.post('/top-consumers', energyController.insertTopConsumer);

module.exports = router;
