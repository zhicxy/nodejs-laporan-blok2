const express = require('express');

const koordinasiController = require('../controllers/koordinasiController');

const router = express.Router();

router.get('/', koordinasiController.index);
router.post('/wa', koordinasiController.wa);
router.get('/gas', koordinasiController.getGas);
router.post('/gas', koordinasiController.gas);


module.exports = router;