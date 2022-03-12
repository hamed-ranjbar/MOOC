const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/main');
/* GET home page. */
router.get('/', ctrl.index());

module.exports = router;