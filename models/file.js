const mongoose = require('mongoose');

// File will contain file path and current time when it was created.

const fileSchema = new mongoose.Schema({

    filePath:{
        type: String,
        required: true
    },
    fileTime:{
        type:String,
    }
},{
    timestamps: true
})

const File = mongoose.model('File', fileSchema);

module.exports = File;