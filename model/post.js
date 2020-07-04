const mysql=require('../bin/conn');

let instance = null;
class Post {
    static getPostInstance() {
        return instance ? instance : new Post();
    } 

    async getAllPosts() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT p.id, p.post_title,u.name ,u.pimage, p.post_content ,p.post_thumbnail,created_at, IFNULL(GROUP_CONCAT(c.title ORDER BY c.title ASC SEPARATOR ','),'Uncategorized') category FROM post p LEFT JOIN post_category p_c ON p.id = p_c.post_id LEFT JOIN category c ON p_c.cat_id = c.id LEFT JOIN user u ON p.post_author = u.id  GROUP BY p.id  ORDER BY p.modified_at DESC";
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

    async editPost(id){
        try{
            const response = new Promise((resolve,reject)=>{
                const query = "SELECT p.id, p.post_title, p.post_content ,p.post_thumbnail,u.name,u.email,created_at, IFNULL(GROUP_CONCAT(c.title ORDER BY c.title ASC SEPARATOR ','),'uncategorized') category FROM post p LEFT JOIN user u ON u.id=p.post_author LEFT JOIN post_category p_c ON p.id = p_c.post_id  LEFT JOIN category c ON p_c.cat_id = c.id  WHERE p.id = ?";
                mysql.query(query, id, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }


    async deletePost(id){
        try{
            const response = new Promise((resolve,reject)=>{
                const query = "DELETE post ,post_category from post LEFT JOIN post_category ON post.id = post_category.post_id  WHERE post.id = ?";
                mysql.query(query, id, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.affectedRows);
                })
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }
    async updatePost(params,cats,id){
        try{
        
            const response = await new Promise((resolve,reject)=>{
                var query="UPDATE post SET ? WHERE id = ? "
                
                mysql.query(query , [params,id,cats,id] ,(err,results)=>{
                    console.log(err)
                    if(err) reject(new Error(err.message));
                    
                    resolve(results.affectedRows);
                });
            });
            return response;
        }
        catch(e){
            console.log(e);
        }

    }
    
}

module.exports=Post;