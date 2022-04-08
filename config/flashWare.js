// configuration of success and error flash messages

const setFlash = (req, res, next)=>{
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    next();
}

module.exports = {setFlash}