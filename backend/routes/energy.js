const express = require('express');
const router = express.Router();
const energyController = require('../controllers/energyController');

router.get('/history', energyController.getEnergyHistory);
router.get('/top-consumers', energyController.getTopConsumers);

module.exports = router;
