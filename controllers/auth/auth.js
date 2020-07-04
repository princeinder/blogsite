const conn=require('../../bin/conn');
const bcrypt = require('bcryptjs');


exports.main=async function(req,res){
    if(req.method == "GET"){
      conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
      res.render('frontend/auth/index',{user:req.session.user,categories:results,message:''});
    }); 
    }
    else{
    if(!req.body.name || !req.body.email || !req.body.password || !req.body.re_password){
    conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
    res.render('frontend/auth/index',{user:req.session.user,categories:results,message:"ALl fields are required"});
    });
  }
    if(req.body.re_password!==req.body.password)
  {
    conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
    res.render('frontend/auth/index',{user:req.session.user,categories:results,message:"Password and Confirm password doesn't match"});
    });
  }
    const encryptedPassword = await bcrypt.hash(req.body.password, 10)
    var users={
      "name":req.body.name,
       "email":req.body.email,
       "phone":req.body.phone,
       "password":encryptedPassword,
       "pimage": req.file.filename,
       "city":req.body.city,
       "state":req.body.state,
       "bio":req.body.bio,
       "facebook_url":req.body.facebook_url,
       "twitter_url":req.body.twitter_url,
     }
  
     conn.query("SELECT 1 FROM user WHERE email = '"+req.body.email+"'", function (error, results, fields) {
       if(error)
       conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
       res.render('frontend/auth/index',{user:req.session.user,categories:results,message:error});
       });
         if(results.length>=1)
         conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
         res.render('frontend/auth/index',{user:req.session.user,categories:results,message:"Email Already exists"});
         });
         else
        conn.query('INSERT INTO user SET ?',users, function (error, results, fields) {
          if (error) {
            conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
            res.render('frontend/auth/index',{user:req.session.user,categories:results,message:"Something went wrong"});
            });
          } else {
             conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
            res.render('frontend/auth/index',{user:req.session.user,categories:results,message:"User Registered Successfully"});
          });     
          }
        });
    });
  }
  }

exports.fregister= async function(req,res){
  if(req.method == "GET"){
    conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
    res.render('frontend/auth/register',{user:req.session.user,id:req.params.id,categories:results,message:''});
  }); 
  }
  else{
  const encryptedPassword = await bcrypt.hash(req.body.password, 10)
  var users={
    "name":req.body.name,
     "email":req.body.email,
     "password":encryptedPassword,
     "pimage": req.file.filename,
     "membership_id":req.body.membership_id
   }

   conn.query("SELECT 1 FROM user WHERE email = '"+req.body.email+"'", function (error, results, fields) {
    console.log(results.length)
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
        console.log(error);
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


exports.creative= async function(req,res){
  console.log(req.body)
  if(req.method == "GET"){
    conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
    res.render('frontend/auth/creative',{user:req.session.user,categories:results,message:''});
  }); 
  }
  else{
  if(!req.body.name || !req.body.email || !req.body.password || !req.body.re_password){
  conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
  res.render('frontend/auth/creative',{user:req.session.user,categories:results,message:"ALl fields are required"});
  });
}
  if(req.body.re_password!==req.body.password)
{
  conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
  res.render('frontend/auth/creative',{user:req.session.user,categories:results,message:"Password and Confirm password doesn't match"});
  });
}
  const encryptedPassword = await bcrypt.hash(req.body.password, 10)
  var users={
    "name":req.body.name,
     "email":req.body.email,
     "phone":req.body.phone,
     "password":encryptedPassword,
     "pimage": req.file.filename,
     "city":req.body.city,
     "state":req.body.state,
     "bio":req.body.bio,
     "facebook_url":req.body.facebook,
     "twitter_url":req.body.twitter,
     "role":4
   }


   conn.query("SELECT 1 FROM user WHERE email = '"+req.body.email+"'", function (error, results, fields) {
     if(error)
     conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
     res.render('frontend/auth/creative',{user:req.session.user,categories:results,message:error});
     });
       if(results.length>=1)
       conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
       res.render('frontend/auth/creative',{user:req.session.user,categories:results,message:"Email Already exists"});
       });
       else
      conn.query('INSERT INTO user SET ?',[users], function (error, results, fields) {
        console.log(error)
        if (error) {
          conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
          res.render('frontend/auth/creative',{user:req.session.user,categories:results,message:"Something went wrong"});
          });
        } else {
           conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
          res.render('frontend/auth/creative',{user:req.session.user,categories:results,message:"User Registered Successfully"});
        });     
        }
      });
  });
}
}



exports.fupdate=async function(req,res){


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




exports.flogin = async function(req,res){
  if(req.method == "GET"){
   await conn.query("SELECT c.id,c.title,(select count(*) from post p LEFT JOIN post_category p_c ON p.id = p_c.post_id WHERE p_c.cat_id = c.id ) as count  FROM category c GROUP BY c.id", function (error, results, fields) {
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
  conn.query('SELECT * FROM user u LEFT JOIN role r ON u.role = r.id WHERE u.email = ?  LIMIT 1',[email], async function (error, results, fields) {
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



  
  
  exports.bregister=async function(req,res){
    if(!req.body.name || !req.body.email || !req.body.password || !req.body.re_password)
    res.render('frontend/auth/register',{user:req.session.user,message:"ALl fields are required"});
    if(req.body.re_password!==req.body.password)
    res.render('frontend/auth/register',{user:req.session.user,message:"Password and Confirm password doesn't match"});
    if(!req.body.agree_term)
    res.render('frontend/auth/register',{user:req.session.user,message:"You must agree to terms & conditions"});
  
    const encryptedPassword = await bcrypt.hash(password, 10)
    var users={
      "name":req.body.name,
       "email":req.body.email,
       "password":encryptedPassword,
       "role":req.body.role
     }
  
     conn.query("SELECT 1 FROM user WHERE email = '"+req.body.email+"'", function (error, results, fields) {
         if(results.length>=1)
         res.render('frontend/auth/register',{user:req.session.user,message:"Email Already exists"});
        else
        conn.query('INSERT INTO user SET ?',users, function (error, results, fields) {
          if (error) {
            res.render('frontend/auth/register',{user:req.session.user,message:"Something went wrong"});
          } else {
            res.render('frontend/auth/register',{user:req.session.user,message:"User Registered Successfully"});
            }
        });
    });
     
  }
  
  exports.update=async function(req,res){
  
  
    if(!req.body.name || !req.body.email)
    res.render('frontend/auth/register',{user:req.session.user,message:"ALl fields are required"});
  
    var users={
      "name":req.body.name,
       "email":req.body.email
     }
  
     
  var id=req.body.id;
     conn.query("SELECT 1 FROM user WHERE email = '"+req.body.email+"'", function (error, results, fields) {
  
      if(results.length>=1 && req.session.user.email !== req.body.email){
        res.render('frontend/home/profile',{user:req.session.user,message:"Email Already exists"});
        }
        else{
        conn.query('UPDATE user SET ? WHERE id=?',[users,id], function (error, results, fields) {
          if (error) {
            res.json({error})
          } else {
             req.session.regenerate(function(){
              req.session.user = {"name":req.body.name,"email":req.body.email,"id":req.body.id};
              res.redirect('/profile')
            });
            
            }
        });
      }
      });
  
     
  }
  
  
  
  exports.blogin = async function(req,res){
      
    if(req.method == "GET"){
       await res.render('backend/auth/login',{user:req.session.user,message:""});
    }
    else{
    if(!req.body.email || !req.body.password){
      await res.render('backend/auth/login',{user:req.session.user,message:"All fields are required"});
    }
    else{
    var email= req.body.email;
    var password = req.body.password;
    
    await conn.query('SELECT user.*, role.id  as role_id , role.title  FROM user  LEFT JOIN  role  ON (user.role = role.id)  WHERE user.email = ? AND user.role = ?   LIMIT 1',[email,1], async function (error, results, fields) {
      if (error) {
        res.render('backend/auth/login',{user:req.session.user,message:"Something went wrong"});
      }else{
        if(results.length >0){
          const comparision = await bcrypt.compare(password, results[0].password)
          if(comparision){
            req.session.regenerate(function(){
              req.session.user = results[0];
              res.redirect('/dashboard');
            });
          }
          else{
            res.render('backend/auth/login',{user:req.session.user,message:"Email and password does not match"});
          }
        }
        else{
       res.render('backend/auth/login',{user:req.session.user,message:"Email does not exists"});
        }
      }
      });
    }}
  }
  




