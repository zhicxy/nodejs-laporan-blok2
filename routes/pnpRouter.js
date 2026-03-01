const express = require('express');

const pnpController = require('../controllers/pnpController');

const router = express.Router();

router.get('/', pnpController.index);
router.get('/ambildata', pnpController.ambilData);


module.exports = router;