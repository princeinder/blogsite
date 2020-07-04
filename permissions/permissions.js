function authViewPost(role){
    return (req, res, next) => {
        if(!req.session.user){
                return res.redirect('/login')
        }
        if(req.session.user){
            if (role.indexOf(req.session.user.title) == -1 ) {
            return res.redirect('/pricing')
        }}
        next()
      }
    }



module.exports = {
    authViewPost
}