// routes/index.js

const express = require('express');
const router = express.Router();
const captureService = require('../services/captureService');

// Route to handle cop selections and determine capture result
router.post('/capture', captureService.handleCaptureRequest);

module.exports = router;
