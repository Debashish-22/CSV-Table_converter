const express = require('express');
const router = express.Router();

const fileRoute = require('./file');
const tableRoute = require('./table');

// all logics of home page
const homeController = require('../controllers/home_controller');

// HOME page route
router.get('/', homeController.home);

// File handling route
router.use('/file', fileRoute);

// Table handling route
router.use('/table', tableRoute);

module.exports = router;