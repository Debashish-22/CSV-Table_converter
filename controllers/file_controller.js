const fs = require('fs');

const File = require('../models/file');

// FILE UPLOAD
const fileUpload = async(req, res) =>{

    try{  
        
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let date =today.getDate() +'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        let dateTime = time+' '+date; 

        await File.create({
            filePath : req.file.path,
            fileTime: dateTime
        })
        // res.json({
        //     msg: "File uploaded sccessfully!"
        // })
        req.flash('success', "File Uploaded Successfully!")
        return res.redirect('/')
    }
    catch(err){
        req.flash('error', "please upload files with '.csv' extension")
        return res.redirect('/');
    }
}

// FILE DELETE 
const fileDelete = async(req, res) =>{
    try{

        let file = await File.findById(req.params.id);
        fs.unlinkSync(file.filePath);
        await File.findByIdAndDelete(file.id);
        req.flash('success', "File Deleted Successfully!")
        return res.redirect('/');
    }
    catch(err){
        console.log("Error in Destroying file!");
        return res.redirect('/');
    }
}

module.exports = {fileUpload, fileDelete}