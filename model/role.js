const conn=require('../../bin/conn');

export async function getRole(id){
    await conn.query("SELECT 1 FROM role WHERE id = ?",[id], function (error, results, fields) {
        if(results)
        console.log(results);
    });
}