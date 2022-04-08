const express = require('express');
const router = express.Router();

// all logics of file operation
const fileController = require('../controllers/file_controller');

const {upload} = require('../config/multerMware')

// file upload route
router.post('/upload', upload.single('csvFile'), fileController.fileUpload);

// file delete route
router.get('/destroy/:id', fileController.fileDelete);

module.exports = router;