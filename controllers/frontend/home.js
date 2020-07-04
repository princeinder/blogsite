const conn=require('../../bin/conn');
var moment = require('moment');
exports.index=function(req,res){
        conn.query("SELECT p.id, p.post_title, p.post_content ,p.post_thumbnail,u.name,u.email,created_at, IFNULL(GROUP_CONCAT(c.title ,- c.id  ORDER BY c.title ASC SEPARATOR ','),'uncategorized') category FROM post p LEFT JOIN user u ON u.id=p.post_author LEFT JOIN post_category p_c ON p.id = p_c.post_id  LEFT JOIN category c ON p_c.cat_id = c.id  GROUP BY p.id ORDER BY p.modified_at DESC", function (error, results1, fields) {
          if(results1.length>=1)   
            conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id ", function (error, results2, fields) {
                if(results2.length>=1) 
                res.render('frontend/home',{user:req.session.user,moment:moment,uposts:results1,categories:results2});
            });
       });
};



exports.single=function(req,res,next){

    conn.query("SELECT p.id, p.post_title, p.post_content ,p.post_thumbnail,u.name,u.email,created_at, IFNULL(GROUP_CONCAT(c.title ORDER BY c.title ASC SEPARATOR ','),'uncategorized') category FROM post p LEFT JOIN user u ON u.id=p.post_author LEFT JOIN post_category p_c ON p.id = p_c.post_id  LEFT JOIN category c ON p_c.cat_id = c.id  WHERE p.id = ?",[req.params.id], function (error, results, fields) {
        if(results.length>=1)   
        conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results1, fields) {
            if(results1.length>=1) 
        res.render('frontend/home/single',{user:req.session.user,moment:moment,post:results[0],categories:results1});
    });
});
  
  }

  exports.pricing=function(req,res,next){
    conn.query("SELECT * FROM category  WHERE id= ?",[req.params.id], function (error, results2, fields) {
    conn.query("SELECT * FROM membership ORDER BY billing_amount ASC", function (error, results, fields) {
        res.render('frontend/home/pricing',{user:req.session.user,currentcat:results2[0],moment:moment,membership:results,categories:results2});
    });
});
}


exports.category=function(req,res,next){
    conn.query("SELECT * FROM category  WHERE id= ?",[req.params.id], function (error, results2, fields) {
    conn.query("SELECT * FROM category c LEFT JOIN post_category p_c ON p_c.cat_id=c.id LEFT JOIN post p ON p.id=p_c.post_id LEFT JOIN user u ON u.id=p.post_author  WHERE c.id= ?",[req.params.id], function (error, results, fields) {
        conn.query("SELECT c.title,c.id ,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results1, fields) {
         if(results.id)
          res.render('frontend/home/category',{user:req.session.user,currentcat:results2[0],moment:moment,uposts:results,categories:results1});
          else
          res.render('frontend/home/category',{user:req.session.user,currentcat:results2[0],moment:moment,uposts:'',categories:results1});
    });
});
}); 
}

  exports.profile=function(req,res){
      if(!req.session.user){
        res.redirect('/');
      }
      else{
    conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
        res.render('frontend/home/profile',{user:req.session.user,moment:moment,categories:results,message:''});
    });
}
  }

  exports.logout= function(req,res){
    req.session.destroy();
      res.redirect('/');
  
  }
  

  exports.register=async function(req,res){
    if(req.method == "GET"){
      if(req.session.user){
        redirect('/');
      }
      conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
      res.render('frontend/auth/register',{user:req.session.user,categories:results,message:''});
    }); 
    }
    else{
    if(!req.body.name || !req.body.email || !req.body.password || !req.body.re_password){
    conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
    res.render('frontend/auth/register',{user:req.session.user,categories:results,message:"ALl fields are required"});
    });
  }
    if(req.body.re_password!==req.body.password)
  {
    conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
    res.render('frontend/auth/register',{user:req.session.user,categories:results,message:"Password and Confirm password doesn't match"});
    });
  }
    const encryptedPassword = await bcrypt.hash(req.body.password, 10)
    var users={
      "name":req.body.name,
       "email":req.body.email,
       "password":encryptedPassword,
       "pimage": req.file.filename
     }
  
     conn.query("SELECT 1 FROM user WHERE email = '"+req.body.email+"'", function (error, results, fields) {
       if(error)
       conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
       res.render('frontend/auth/register',{user:req.session.user,categories:results,message:error});
       });
         if(results.length>=1)
         conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
         res.render('frontend/auth/register',{user:req.session.user,categories:results,message:"Email Already exists"});
         });
         else
        conn.query('INSERT INTO user SET ?',users, function (error, results, fields) {
          if (error) {
            conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
            res.render('frontend/auth/register',{user:req.session.user,categories:results,message:"Something went wrong"});
            });
          } else {
             conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
            res.render('frontend/auth/register',{user:req.session.user,categories:results,message:"User Registered Successfully"});
          });     
          }
        });
    });
  }
  }
  
  exports.update=async function(req,res){
  
  
    if(!req.body.name || !req.body.email)
    conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
    res.render('frontend/auth/register',{user:req.session.user,message:"ALl fields are required"});
    });
    if(req.file){
      console.log(req.file.filename)
      var users={
        "name":req.body.name,
         "email":req.body.email,
         "pimage":req.file.filename
       }
  
    }
    else{
      console.log("req.file.filename")
    var users={
      "name":req.body.name,
       "email":req.body.email,
     }
    }
  
     
  var id=req.body.id;
     conn.query("SELECT 1 FROM user WHERE email = '"+req.body.email+"'", function (error, results, fields) {
      if(results.length>=1 && req.session.user.email !== req.body.email){
        conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
        res.render('frontend/home/profile',{user:req.session.user,categories:results,message:"Email Already exists"});
        });  
      }
        else{
        conn.query('UPDATE user SET ? WHERE id=?',[users,id], function (error, results, fields) {
          if (error) {
            conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
            res.json({error})
            });
          } else {
             req.session.regenerate(function(){
               if(req.file)
              req.session.user = {"name":req.body.name,"email":req.body.email,"id":req.body.id,"pimage":req.file.filename};
              else
              req.session.user = {"name":req.body.name,"email":req.body.email,"id":req.body.id,"pimage":req.body.pimageold};
              res.redirect('/profile')
            });
            
            }
        });
      }
      });
  
     
  }
  
  
  
  
  exports.login = function(req,res){
    if(req.method == "GET"){
      if(req.session.user){
        redirect('/');
      }
      conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
      res.render('frontend/auth/login',{user:req.session.user,categories:results,message:''});
    }); 
    }
    if (req.method == "POST") {
      // do form handling
    if(!req.body.email || !req.body.password){
      conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
    res.render('frontend/auth/login',{user:req.session.user,categories:results,message:"All fields are required"});
      }); 
  }
    else{
    var email= req.body.email;
    var password = req.body.password;
    conn.query('SELECT * FROM user WHERE email = ? AND role = ? LIMIT 1',[email,3], async function (error, results, fields) {
      if (error) {
        res.render('frontend/auth/login',{user:req.session.user,message:"Something went wrong"});
      }else{
        if(results.length >0){
  
          const comparision = await bcrypt.compare(password, results[0].password)
          if(comparision){
            req.session.regenerate(function(){
             // console.log(results[0]);
             console.log(results[0])
              req.session.user = results[0];
              res.redirect('/');
            });
          }
          else{
            conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
            res.render('frontend/auth/login',{user:req.session.user,categories:results,message:"Email and password does not match"});
            });
          }
        }
        else{
          conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
       res.render('frontend/auth/login',{user:req.session.user,categories:results,message:"Email does not exists"});
      });
        }
      }
      });
    }
    }
  }