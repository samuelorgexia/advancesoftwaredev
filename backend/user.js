
const express = require("express");
const router = express.Router();
const connection = require('./db');
const bycrpt = require('bcrypt');
const createJwt = require("./jwt/jwt-function");
const jwtAuth = require('./jwt/jwt-auth');
const newUserVerify=require('./middleware/newUserVerify');
const salt=10;

router.post("/signup",async (req,res)=>{
  const {firstName,lastName,email,password}=req.body;
try{
    // hashed password
    const hashPassword= await bycrpt.hash(password,salt);
  // check for existing user 
  const findsql=`SELECT * FROM user WHERE email = `+connection.escape(email);
  const find =connection.query(findsql,function(error,result){
    if(error) throw error;
    if(result==0){
      
      // add user 
        const sql=`INSERT INTO user (first_name,last_name,email,password) VALUES (?,?,?,?)`;
      const post =connection.query(sql,[firstName,lastName,email,hashPassword],function(error,results){
        if(error) throw error;
    
      });
      
   
      // create jwt token 
      const getUsersql='SELECT * FROM user WHERE email= '+connection.escape(email);
      connection.query(getUsersql,function(err,results){
        if(error) throw error;
      const token =createJwt(JSON.parse(JSON.stringify(results[0].user_id)));
      console.log(results);
      //console.log(token);

           //retrieve role 
           const role=`SELECT * FROM role WHERE role_id =`+1;
          connection.query(role,function(error,result){
             if(error) throw error;
             const getRole=JSON.parse(JSON.stringify(result[0].role_id));
             
             //add user role entry
             const userRoleSQL=`INSERT INTO user_role(user_id,role_id)VALUES(?,?)`;
        const test= connection.query(userRoleSQL,[JSON.parse(JSON.stringify(results[0].user_id)),getRole],function(error,row){
          if(error) throw error;
          
          // update user table with user_role_id
                const addUserRoleId=`UPDATE user SET user_role_id=? WHERE email =` +connection.escape(email);
                connection.query(addUserRoleId,[row.insertId],function(err,result){
                 if(err) throw err;
               });
        
        });
        });
        
      res.status(200).json({token});
      
      });
 
    }else{
      res.send("Existing user with that emails exist");
    }
  });
    


}catch(err){
    console.log(err.message);
    res.send(err);
}
});



router.get("/get-users",(req,res)=>{
  try{
    const sql="SELECT * FROM user";
    connection.query(sql,function(error,results){
      if(error)throw error;
      console.log(results);
      res.send(results);
    });
    
  }catch(err){
    console.log(err.message);
  }
});

router.get("/find-user/:id",(req,res)=>{
  const {id}=req.params;
  try{
    const sql='SELECT * FROM user WHERE user_id ='+ connection.escape(id);
  const find= connection.query(sql,function(err,result,fields){
      if(err)throw error;
     
      //if(result.length>0){
      res.send(result);
    //  } res.send("does not exist");
    
    });
    
    
  }catch(err){
    console.log(err.message);
  }
});

router.put("/update-user/:id",async(req,res)=>{
  const {id}=req.params;
  var {firstName,lastName,password}=req.body;
  try{
    // fill in blanks
    const sql='SELECT * FROM user WHERE user_id ='+ connection.escape(id);
    const find= connection.query(sql,function(err,result){
        if(err)throw err;
        const firstNamePrev=JSON.parse(JSON.stringify(result[0].first_name));
        console.log(JSON.parse(JSON.stringify(firstName.length)));
        

        if(password.length==0){
          password=JSON.parse(JSON.stringify(result[0].password));
        }
        if(firstName.length==0){
          firstName=JSON.parse(JSON.stringify(result[0].first_name));
        }
        if(lastName.length==0){
          lastName=JSON.parse(JSON.stringify(result[0].last_name));
        }
      });
   
      password= await bycrpt.hash(password,salt);
      const updatesql='UPDATE user SET first_name=?,last_name=?,password=? WHERE user_id ='+connection.escape(id);
      connection.query(updatesql,[firstName,lastName,password],function(err,result){
        if(err) throw err;
        res.send("updated details");
      });



  }catch (err){
    console.log(err.message);

  }
});


router.delete("/delete-user/:id",(req,res)=>{
    const {id}=req.params;
    try{
      const sql="DELETE FROM user WHERE user_id = "+ connection.escape(id);
      const deleteUser=connection.query(sql,function(err,result){
        if(err)throw err;
        res.send("Deleted user"+id);
      });
    }catch(err){
      console.log(err.message);
    }

});
router.post("/verify",jwtAuth,(req,res)=>{
  try{
    res.json(true);
  }catch(err){
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post("/login",async(req,res)=>{
  const {email,password}=req.body;
  
  try{
    // get user by email
    const getUsersql='SELECT * FROM user WHERE email= '+connection.escape(email);
    const query=await connection.query(getUsersql,function(err,result){
      if(err) throw err;
      
       // if user email and password matches
        if(email==JSON.parse(JSON.stringify(result[0].email))&&bycrpt.compareSync(password,JSON.parse(JSON.stringify(result[0].password)))){
          const token =createJwt(JSON.parse(JSON.stringify(result[0].user_id)));
          //console.log(token);
          res.status(200).json({token});
        }
        // mismatch
        if(email!=JSON.parse(JSON.stringify(result[0].email))&&bycrpt.compareSync(password,JSON.parse(JSON.stringify(result[0].password)))){
          res.send("incorrect email");
        } 
        if(email==JSON.parse(JSON.stringify(result[0].email))&&!bycrpt.compareSync(password,JSON.parse(JSON.stringify(result[0].password)))){
          res.send("wrong password");
        } 
        
        
        
        return err;
    });
   
  }catch(err){

  }

});


module.exports=router;