const mysql=require('../bin/conn');
console.log("====================================mysql");
console.log(mysql);
let instance = null;

class Category{
    static getCategoryInstance() {
        return instance ? instance : new Category();
    }

    async  getCategories() {
        try{

        const response = new Promise((resolve,reject)=>{
            const query = "SELECT * from category";
            mysql.query(query , (err,results)=>{
                if(err)reject(err);
                resolve(results);
            });
        })
        return response;
    } 
    catch (error) {
        console.log(error);
    }
}



}

module.exports=Category;
