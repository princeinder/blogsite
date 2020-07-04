function formValidate(req,res,next){
    if(req.body.password !== req.body.re_password)
    return res.redirect('/register');    
    next()
}



module.exports = {
    formValidate
}