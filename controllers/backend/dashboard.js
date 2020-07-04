const conn=require('../../bin/conn');
var moment = require('moment');
var User=require('../../model/user');
var Post=require('../../model/post');
var Common=require('../../model/common');
const bcrypt = require('bcryptjs');
var Category=require('../../model/category');


exports.index=async function(req,res){
 var common= Common.getDbServiceInstance();
 var result= common.getItemsCount(1);
 result.then(data=>{
  res.render('backend/dashboard',{user:req.session.user,posts:data.posts,users:data.users,categories:data.categories});
 })   
}

exports.userlist=function(req,res){

  var user = User.getUserInstance();
  var result = user.getAllUsers(req.session.user.role);
  result
  .then(data => {
    res.render('backend/dashboard/userlist',{user:req.session.user,moment:moment,data:data});
  })
  .catch(err =>res.render('backend/dashboard/userlist',{user:req.session.user,moment:moment,error:err}));  
}


exports.useredit=function(req,res){

  const user = User.getUserInstance();
  const result = user.getSingleUser(req.params.id);
  result
  .then(data => {

    res.render('backend/dashboard/useredit',{user:req.session.user,moment:moment,data:data[0]});
  })
  .catch(err =>res.render('backend/dashboard/useredit',{user:req.session.user,moment:moment,error:err}));  
}

exports.updateuser=function(req,res){

  const user = User.getUserInstance();

  if(req.file)
  req.body.pimage=req.file.filename;
  const result = user.updateNameById(req.body,req.body.id);
  
  result
  .then(data => {
    res.redirect('/dashboard/userlist');
  })
  .catch(err =>res.render('backend/dashboard/useredit',{user:req.session.user,moment:moment,error:err}));  
}

exports.deleteuser=function(req,res){

  const user = User.getUserInstance();
  const result = user.deleteRowById(req.params.id);
  
  result
  .then(data => {
    res.redirect('/dashboard/userlist');
  })
  .catch(err =>res.render('backend/dashboard/userlist',{user:req.session.user,moment:moment,error:err}));  
}



exports.blogpost=function(req,res){

  const post = Post.getPostInstance();
  const result = post.getAllPosts();

  result
  .then(data => {

    res.render('backend/dashboard/blogposts',{user:req.session.user,moment:moment,blogposts:data});
  })
  .catch(err =>res.render('backend/dashboard/blogposts',{user:req.session.user,moment:moment,error:err})); 
}

exports.blogpostdelete=function(req,res){

  const post = Post.getPostInstance();
  const result = post.deletePost(req.params.id);
  result
  .then(data => {
    res.redirect('/dashboard/blogpost')
 })
  .catch(err =>res.render('backend/dashboard/blogposts',{user:req.session.user,moment:moment,error:err})); 
 
    
}

exports.blogpostedit=function(req,res){

  const post = Post.getPostInstance();
  const result = post.editPost(req.params.id);
  result
  .then(data => {
    const category = Category.getCategoryInstance();
    category.getCategories().then(cat=>{
      res.render('backend/dashboard/blogpostedit',{user:req.session.user,moment:moment,cat:cat,blogposts:data[0]});
    }).catch(err =>{
      res.render('backend/dashboard/blogposts',{user:req.session.user,moment:moment,error:err})}); 
 })
  .catch(err =>{
    res.render('backend/dashboard/blogposts',{user:req.session.user,moment:moment,error:err})}); 
 
    
}


exports.blogpostupdate=function(req,res){
var catsid=[];
  var cats=req.body.cat_ids.split(',');
  cats.map(function(catid){
    catsid.push([catid])
 })
 delete req.body.cat_ids;
 if(req.file)
 req.body.post_thumbnail=req.file.filename;

  const post = Post.getPostInstance();
  const result = post.updatePost(req.body ,catsid,req.params.id);
  result
  .then(data => {
    return res.json({success:true,message:"Post Updated Successfully"});
 })
  .catch(err =>{
    return res.json({success:false,message:"Something went wrong"});
  })  
}







exports.membership=async function(req,res){
if(req.params.id){
  await conn.query("DELETE  FROM membership WHERE id= ? ",[req.params.id], function (error, results, fields) {
    res.redirect('/dashboard/membership')
    });

}
else{
 await conn.query("SELECT * FROM membership ORDER BY id", function (error, results, fields) {
  res.render('backend/dashboard/membership',{user:req.session.user,moment:moment,memberships:results});
  });
}
  }




exports.addmembership=async function(req,res){

  if(req.method=='GET'){
   res.render('backend/dashboard/addmembership',{user:req.session.user,moment:moment,message:"",updating:false});
}
   else{
  await conn.query("SELECT 1 FROM membership WHERE name = ?" ,[req.body.name], function (error, results, fields) {
    console.log(error)
    if(results.length>=1)
      res.render('backend/dashboard/addmembership',{user:req.session.user,membership:"",message:"name exists already",updating:false});
      else{
      conn.query('INSERT INTO membership SET ?',[req.body], function (error, results, fields) {  
        if(error)
      res.render('backend/dashboard/addmembership',{user:req.session.user,membership:"",message:"something went wrong",updating:false});
        else
        res.redirect('/dashboard/membership');
        
      });
    }
  });}

  
}

exports.updatemembership=async function(req,res){

  if(req.method=='GET'){
  await conn.query("SELECT * FROM membership WHERE id = ?" ,[req.params.id], function (error, results, fields) {
  if(results.length>=1)
  res.render('backend/dashboard/updatemembership',{user:req.session.user,membership:results[0],moment:moment,message:"",updating:true});
  else 
  res.render('backend/dashboard/updatemembership',{user:req.session.user,membership:"",moment:moment,message:"",updating:false});
});

}
   else{
    var params={name:req.body.name,
                description:req.body.description,
                billing_amount:req.body.billing_amount,
                billing_amount_multiple:req.body.billing_amount_multiple,
                 billing_amount_suffix:req.body.billing_amount_suffix}
      conn.query('UPDATE membership SET ? WHERE id = ? ',[params,req.body.id], function (error, results, fields) {  
        if(error)
      res.render('backend/dashboard/updatemembership',{user:req.session.user,membership:"",message:"something went wrong",updating:false});
        else
        res.redirect('/dashboard/membership');
        
      });
}
  
}








exports.addpost=function(req,res){
  if(!req.session.user)
  res.redirect('/admin');
  if(!req.body.post_title)
  res.json({success:false,message:"Post title is required"});
  else
  conn.query("SELECT 1 FROM post WHERE post_title = '"+req.body.post_title+"'", function (error, results, fields) {
    if(results.length>=1){
      return res.json({success:false,message:"Post title already exists"});
      }
     else
     {
     
       if(req.file){
     var post={"post_title":req.body.post_title,"post_content":req.body.post_content,"post_status":req.body.post_status,"post_author":req.body.post_author,"post_thumbnail": req.file.filename,"post_visibility":"public"}
       }
     else{
 
     var post={"post_title":req.body.post_title,"post_content":req.body.post_content,"post_status":req.body.post_status,"post_author":req.body.post_author,"post_visibility":"public"}
     }
     conn.query('INSERT INTO post SET ?',post, function (error, results, fields) {
      if (error) {
        res.json({success:false,message:error});
       } else {
         var values=[];
         var insertId=results.insertId
         if(req.body.cat_ids && insertId){
          var insertId=results.insertId;
          var catarr=req.body.cat_ids.split(',');
          catarr.map(function(catid){
            values.push([insertId,catid])
           })
          conn.query('INSERT INTO post_category(post_id, cat_id) VALUES ?',[values], function (error, results, fields) {
            if(error){
              return res.json({success:false,message:"Post title is required"});
            }
            else{
              return res.json({success:true,message:"success"});
            }     
          });
         }
         else{
         return res.json({success:true,message:"success"});
         }
         }
         
     });
    }
 });

}




exports.addCategory=function(req,res){
    if(!req.session.user)
    res.redirect('/admin');
    if(!req.body.title)
    res.send({success:false,message:"Please enter catgeory name"});
    else
    conn.query("SELECT 1 FROM category WHERE title = '"+req.body.title+"'", function (error, results, fields) {
        if(results.length>=1){
        res.json({success:false,message:"Category Already exists"});
        }
       else
       {
       var cat={"title":req.body.title}
       conn.query('INSERT INTO category SET ?',cat, function (error, results, fields) {
         if (error) {
            res.json({success:false,message:error});
         } else {

            res.json({success:true,message:"success",data:{"id":results.insertId,"title":req.body.title}});
           }
       });
      }
   });
}

exports.deleteCategory=function(req,res){
  if(!req.session.user)
  res.redirect('/admin');
  if(!req.body.id)
  res.send({success:false,message:"Please enter catgeory name"});
  else
  conn.query("DELETE c , pc FROM category c  LEFT JOIN post_category pc ON c.id = pc.cat_id WHERE c.id = ?" ,[req.body.id] , function (error, results, fields) {
    if(error){
      res.json({success:false,message:"Category Already exists"});
      }
      else{
      res.json({success:true,message:"Category removed"});
      }  
 });
}

exports.post=function(req,res){
    if(!req.session.user)
    res.redirect('/admin');
    else
    conn.query("SELECT * FROM category", function (error, results, fields) {
        if(results.length>=1)
        res.render('backend/dashboard/post',{user:req.session.user,cat:results,message:"Success"});
       else
       res.render('backend/dashboard/post',{user:req.session.user,cat:'',message:"No categoory found"});
    });
}

exports.profile=async function(req,res){
  if(req.method=='GET'){
  res.render('backend/dashboard/profile',{user:req.session.user,message:''});
  }
  else{
  if(req.file){
  req.body.pimage=req.file.filename;
  }
  const user = User.getUserInstance();
  const row = user.fieldExists('email',req.body.email,req.body.id);
  row.then(async data=>{
    if(!data){     
     const result = user.updateNameById(req.body,req.body.id);
     result
      .then(data => {
     if(data){

      req.session.regenerate(function(){
         res.render('backend/dashboard/profile',{user:req.session.user,message:{success:"User updated successfully"}});
       });
   }
  });
}
else{
  res.render('backend/dashboard/profile',{user:req.session.user,message:{err:"Email Already exists"}});
}
});
}
}

exports.changepassword=async function(req,res){
  if(req.method=='GET'){
  res.render('backend/dashboard/changepassword',{user:req.session.user,message:''});
  }
  else{
  const user = User.getUserInstance();
  const row = user.passwordExists(req.body.old_password,req.body.id);
  row.then(async data=>{
  if(data){   
  const new_password = await bcrypt.hash(req.body.new_password, 10);
  var params = {'password':new_password};
  const result = user.updateNameById(params,req.body.id);
  result
  .then(data => {
    if(data){
    res.render('backend/dashboard/changepassword',{user:req.session.user,message:{success:"Password  updated successfully"}});
    }
  }).catch(err=>{
    res.render('backend/dashboard/changepassword',{user:req.session.user,message:{err:"Something went wrong"}});
  });
}
else{
  res.render('backend/dashboard/changepassword',{user:req.session.user,message:{err:"Incorrect password"}});
}
})
}
}





exports.logout=function(req,res){
    req.session.destroy();
    res.redirect('/admin');
  }




