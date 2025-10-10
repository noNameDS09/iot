const express = require('express');
const router = express.Router();

// @route   GET /
// @desc    Home page
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = router;

