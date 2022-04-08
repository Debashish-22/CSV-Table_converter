const express = require('express');
const router = express.Router();

// logics of table page
const tableController = require('../controllers/table_controller');

// creating table route
router.get('/generate/:id', tableController.generate);

module.exports = router;