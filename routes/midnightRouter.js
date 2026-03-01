const express = require('express');

const midnightController = require('../controllers/midnightController');
const { MinKey } = require('mongodb');

const router = express.Router();

router.get('/', midnightController.index);
router.post('/submit', midnightController.submit);
router.post('/update', midnightController.update);
// router.get('/values', midnightController.values);
// router.post('/values/submit', midnightController.submit);
// router.post('/values/anotherSubmit', midnightController.anotherSubmit);

// router.get('/mencoba', midnightController.mencoba);
// router.post('/cobaPost', midnightController.cobaPost);
// router.post('/cobaUpdate', midnightController.cobaUpdate);

module.exports = router;