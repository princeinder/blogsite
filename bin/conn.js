
module.exports=(mysql,server,config) =>{
    server.listen(config.port,(req,res)=>{
        console.log(`Server started at ${config.port}`)
    })
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'prince123',
  database : 'myblog'
});
 

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
 module.exports=connection;   
}
