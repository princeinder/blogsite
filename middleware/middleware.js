function authUserBackend(req,res,next){
    if (req.session.user) {
        return next();
    }
   return res.redirect('/admin')
}


function authUserFrontend(req,res,next){
    if (req.session.user) {
        return next();
    }
   return res.redirect('/login')
}

function userRole(role){
    return (req, res, next) => {
        if(req.session.user){
        if (role.indexOf(req.session.user.title) == -1 ) {
            res.status(401)
            return res.send('You are not allowed to access this page')
        }}
        next()
      }
    }

    function userMembership(){
        return (req, res, next) => {
            if(req.param.type){
            if (role.indexOf(req.session.user.title) == -1 ) {
                res.status(401)
                return res.send('You are not allowed to access this page')
            }}
            next()
          }
    }

    function checkusertype(req,res,next){
        if(req.params.id=='free'){
            return next();
        }
        return res.redirect('/creative/'+req.params.id)
    }


module.exports={ authUserFrontend ,authUserBackend,userRole,userMembership,checkusertype }