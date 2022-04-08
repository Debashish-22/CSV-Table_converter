const fs = require('fs');
const { parse } = require('csv-parse');
// requiring File model 
const File = require('../models/file');

// Converting of csv file into array of arrays using 'csv-parse' library with some delimiters and some options 
// to avoid imperfect csv files please follw documentation of mentioned library for details.
const generate = async (req, res) => {

    try {
        let file = await File.findById(req.params.id);
        let filePath = file.filePath;
        let parsedData =[]
        fs.createReadStream(filePath)
        .pipe(parse({
            delimiter:[",", "\t", "|", "\n"],
            trim: true,
            relax_quotes:true,
            relax_column_count: true,
            skip_empty_lines: true,
            skip_records_with_empty_values: true,
            skip_records_with_error: true
        }))
        .on('data', function (csvrow) {
            parsedData.push(csvrow);
        })
        .on('end', function () {
            // If AJAX request then send this parsed data
            
            if(req.xhr){
                
                return res.json({
                    parsedData
                })
            }
            
            return res.render('table_page', { 
                data : parsedData,
                id : req.params.id
            })
        });  
        
    }
    catch (err) {
        req.flash('error', "Error in creating Table!")
        return res.redirect('/')
    }
}

module.exports = { generate }