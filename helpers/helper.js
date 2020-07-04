var User=require('../model/user');

 function sessionRegenerate(id) {
    return async (req,res)=>{
        const user = User.getUserInstance();
        const result= await user.getSingleUser(id); 
        req.session.regenerate(function(){
                req.session.user=result[0];
                return true;
            })    

    }

}

module.exports={sessionRegenerate};

