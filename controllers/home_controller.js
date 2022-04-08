const File = require('../models/file');

// when visiting home route we will show list of file uploaded by user if there.

const home = async(req, res) =>{
    let files = await File.find({}).sort({'createdAt' : -1});
    res.render('home', {files});
}

module.exports = { home }