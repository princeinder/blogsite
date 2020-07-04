const auth=require('../controllers/auth/auth');
const home=require('../controllers/frontend/home');
const dashboard=require('../controllers/backend/dashboard');
const { authUserBackend,authUserFrontend,userRole ,userMembership,checkusertype}=require('../middleware/middleware');
const { authViewPost  }=require('../permissions/permissions');
const { paypalPayment }=require('../payment/payment');

module.exports=(app,upload,uploadAvatar) =>{
app.all('/login',  auth.flogin);		
app.post('/register',uploadAvatar.single('pimage'),auth.fregister);
app.get('/register/:id',checkusertype,uploadAvatar.single('pimage'),auth.fregister);
app.post('/creative',paypalPayment,uploadAvatar.single('pimage'),auth.creative);
app.get('/creative/:id',uploadAvatar.single('pimage'),auth.creative);



app.get('/',home.index);
app.get('/post/:id',authViewPost(['admin','creativeuser','author']),home.single);
app.get('/cat/:id',home.category);
app.get('/profile',authUserFrontend,home.profile);
app.post('/update',authUserFrontend,uploadAvatar.single('pimage'),auth.update);
app.get('/logout',authUserFrontend,home.logout);
app.get('/pricing',home.pricing);



app.all('/admin',auth.blogin);
app.all('/admin/register', auth.bregister);
app.get('/dashboard',authUserBackend,userRole(['admin','author']),dashboard.index);
app.get('/dashboard/userlist',authUserBackend,userRole(['admin']),dashboard.userlist);
app.post('/dashboard/updateuser',authUserBackend,userRole(['admin']),uploadAvatar.single('pimage'),dashboard.updateuser);
app.get('/dashboard/userlist/:id',authUserBackend,userRole(['admin']),dashboard.useredit);
app.get('/dashboard/deleteuser/:id',authUserBackend,userRole(['admin']),dashboard.deleteuser);
app.get('/dashboard/blogpost',authUserBackend,userRole(['admin','author']),dashboard.blogpost);
app.get('/dashboard/blogpost/edit/:id',authUserBackend,userRole(['admin','author']),dashboard.blogpostedit);

app.put('/dashboard/blogpost/update/:id',authUserBackend,userRole(['admin','author']),authUserBackend,upload.single('post_thumbnail'),dashboard.blogpostupdate);
app.get('/dashboard/blogpost/delete/:id',authUserBackend,userRole(['admin','author']),dashboard.blogpostdelete);

app.post('/dashboard/blogpost/addCategory',userRole(['admin','author']),authUserBackend,dashboard.addCategory);
app.post('/dashboard/blogpost/deleteCategory',userRole(['admin','author']),authUserBackend,dashboard.deleteCategory);
app.get('/dashboard/post',userRole(['admin','author']),authUserBackend,dashboard.post);
app.get('/dashboard/membership',userRole(['admin','author']),authUserBackend,dashboard.membership);

app.all('/dashboard/addmembership',userRole(['admin']),authUserBackend,dashboard.addmembership);
app.get('/dashboard/updatemembership/:id',userRole(['admin']),authUserBackend,dashboard.updatemembership);
app.post('/dashboard/updatemembership',userRole(['admin']),authUserBackend,dashboard.updatemembership);
app.get('/dashboard/membership/:id',userRole(['admin']),authUserBackend,dashboard.membership);
app.get('/dashboard/logout',userRole(['admin','author']),authUserBackend,dashboard.logout);
app.all('/dashboard/profile',userRole(['admin','author']),authUserBackend,dashboard.profile);
app.all('/dashboard/profile/changepassword',userRole(['admin','author']),authUserBackend,dashboard.changepassword);
app.post('/dashboard/blogpost/addpost',userRole(['admin','author']),authUserBackend,upload.single('post_thumbnail'), dashboard.addpost);

}
