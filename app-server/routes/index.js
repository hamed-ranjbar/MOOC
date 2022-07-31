const express = require('express');
const router = express.Router();

const ctrlIndex = require('../controllers/main');
const ctrlStream = require('../controllers/stream');

/* GET home page. */
router.get('/stream/:link', ctrlStream.streamVideo);

module.exports = router;