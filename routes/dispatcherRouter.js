const express = require('express');

const dispatcherController = require('../controllers/dispatcherController');
const { MinKey } = require('mongodb');

const router = express.Router();

router.get('/', dispatcherController.index);
router.get('/load', dispatcherController.load);
//router.get('/wa', dispatcherController.copyLaporan);

module.exports = router;