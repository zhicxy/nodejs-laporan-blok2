const express = require('express');

const test_controller = require('../controllers/testController');

const router = express.Router();

router.get('/',test_controller.coba);

module.exports = router;