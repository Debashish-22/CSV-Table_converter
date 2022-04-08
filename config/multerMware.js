// MULTER (File upload library) configuration

const path = require('path');
const multer = require('multer');

// file path in system
const FILE_PATH = path.join('/uploads/files');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', FILE_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload= multer({ 
    storage: storage,

    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.csv') {
            // req.flash('error', "please upload files with '.csv' extension")
            return callback(null, false);
        }
        callback(null, true)
    }
})

module.exports = { upload }