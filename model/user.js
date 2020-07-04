const mysql=require('../bin/conn');
console.log(mysql)
const bcrypt = require('bcryptjs');
let instance = null;

class User {
    static getUserInstance() {
        return instance ? instance : new User();
    } 

    async getAllUsers(role) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT u.id , u.pimage , u.name ,u.phone, u.email ,u.city ,u.state ,u.bio , m.name as membership , r.title FROM user u LEFT JOIN role r ON u.role = r.id LEFT JOIN membership m ON u.membership_id = m.id  WHERE r.id <> "+role+"";
                mysql.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getSingleUser(id) {

        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT u.id , u.pimage , u.name ,u.phone, u.email ,u.city ,u.state ,u.bio , m.name as membership , r.title FROM user u LEFT JOIN role r ON u.role = r.id LEFT JOIN membership m ON u.membership_id = m.id  WHERE u.id = "+id+"";
 
                mysql.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async fieldExists(field,value,id='') {

        try {
            const response = await new Promise((resolve, reject) => {
                var query = "SELECT 1 FROM  user WHERE "+field+" = ?";
                if(id)
                query +=" AND id <> ?";
                mysql.query(query,[value,id] ,(err, results) => {
                    if (err) reject(new Error(err.message));
                    console.log(results[0])
                    resolve(results[0]);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async passwordExists(value,id) {

        try {
            const response = await new Promise((resolve, reject) => {
                var query = "SELECT * FROM  user WHERE id = ? ";
                mysql.query(query,[id] ,(err, results) => {
                    if (err) reject(new Error(err.message));
                     bcrypt.compare(value, results[0].password,function(err, result){
                        resolve(result);
                     });                
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, date_added) VALUES (?,?);";

                conn.query(query, [name, dateAdded] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
                name : name,
                dateAdded : dateAdded
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM user WHERE id = ?";
    
                mysql.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById( body,id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE user SET ? WHERE id = ?";
    
                mysql.query(query,[body ,id] , (err, result ,fields) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names WHERE name = ?;";

                mysql.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }   
}

module.exports=User;
