var express=require('express');
var app=express();

var http=require('http');
var path = require('path');

var server=http.createServer(app);
var createError = require('http-errors');
var cors=require('cors');
var bodyParser=require('body-parser');
var mysql    = require('mysql');
var crypto=require('crypto');
var jwt=require('jsonwebtoken');
const session = require('express-session')
var multer = require('multer');
var flash = require('express-flash');
var config=require('./config');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    
    callback(null, './public/backend/images/post')
  },
  filename: function(req, file, cb){
    console.log(file)

    cb(null, Date.now()+"."+file.originalname.split('.').pop());
}});

var storageAvatar = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/backend/images/avatars')
  },
  filename: function(req, file, cb){
    cb(null, Date.now()+"."+file.originalname.split('.').pop());
}});



const upload = multer({
  storage: storage
});

const uploadAvatar = multer({
  storage: storageAvatar
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(flash());
app.use(express.static(__dirname + '/public'));
app.use('/frontend', express.static(__dirname + '/public/frontend'));
app.use('/dashboard', express.static(__dirname + '/public/backend'));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

require('./bin/conn')(mysql,server,config);
require('./bin/paypal')
require('./routes/web')(app,upload,uploadAvatar);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



