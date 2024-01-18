const express = require('express');
const router = new express.Router();
const { addTest, getTests, updateTest, getTestById } = require('../Controllers/TestController');

router.post('/add', addTest);
router.get('/get-all', getTests);
router.put('/update-test/:id', updateTest);
router.get('/get-test/:id', getTestById);

module.exports = router;