
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
      const roleSql=`SELECT * FROM role WHERE role_id =`+1;
      connection.query(roleSql,function(error,result){
        if(error) throw error;
        const role=JSON.parse(JSON.stringify(result[0].role_name));
        
      // add user 
        const sql=`INSERT INTO user (first_name,last_name,role,email,password) VALUES (?,?,?,?,?)`;
      const post =connection.query(sql,[firstName,lastName,role,email,hashPassword],function(error,row){
        if(error) throw error;
        const token =createJwt(row.insertId,role);
        console.log(token);
        res.status(200).json({token});
      });
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


// admin features
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

// admin features
router.get("/find-user/:id",(req,res)=>{
  
  const {id}=req.params
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
  // user features
router.get("/get-user",jwtAuth,async(req,res)=>{
  
  console.log("get user"+req.user.id)
  
  try{
    //res.json(true);
    const sql='SELECT * FROM user WHERE user_id ='+ connection.escape(req.user.id);
    console.log(sql);
    connection.query(sql,function(err,result){
      if(err) throw err;
      res.json(result);
   
    });
    
  }catch(err){
    console.log(err.message);
    res.status(500).send("server error");

  }
});
  // admin feature
router.put("/update-user/:id",async(req,res)=>{
  const {id}=req.params;
  var {firstName,lastName,email,password}=req.body;
  console.log(req.body);
  console.log(id);
  try{
    // fill in blanks
    const sql='SELECT * FROM user WHERE user_id ='+ connection.escape(id);
     connection.query(sql,function(err,result){
        if(err)throw err;
        const firstNamePrev=JSON.parse(JSON.stringify(result[0].first_name));
        console.log(JSON.parse(JSON.stringify(password.length)));
        

        if(password.length==0){
          password=JSON.parse(JSON.stringify(result[0].password));
        }
        if(firstName.length==0){
          firstName=JSON.parse(JSON.stringify(result[0].first_name));
        }
        if(lastName.length==0){
          lastName=JSON.parse(JSON.stringify(result[0].last_name));
        }
        if(email.length==0){
          email=JSON.parse(JSON.stringify(result[0].email));
        }
      });
   
      password= await bycrpt.hash(password,salt);
      const updatesql='UPDATE user SET first_name=?,last_name=?,password=?,email=? WHERE user_id ='+connection.escape(id);
      connection.query(updatesql,[firstName,lastName,password,email],function(err,result){
        if(err) throw err;
        res.send("updated details");
      });



  }catch (err){
    console.log(err.message);

  }
});
  // update user for themselves when login
router.put("/update-user-themselves",jwtAuth,async(req,res)=>{
  var {firstName,lastName,password}=req.body;
  console.log(req.body);
  console.log(req.user.id);
  try{
    // fill in blanks
    const sql='SELECT * FROM user WHERE user_id ='+ connection.escape(req.user.id);
     connection.query(sql,function(err,result){
        if(err)throw err;
        const firstNamePrev=JSON.parse(JSON.stringify(result[0].first_name));
        console.log(JSON.parse(JSON.stringify(password.length)));
        

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
      const updatesql='UPDATE user SET first_name=?,last_name=?,password=? WHERE user_id ='+connection.escape(req.user.id);
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
router.post("/verify",jwtAuth,async(req,res)=>{
  try{
    
    res.json(true);
  }catch(err){
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post("/login",async(req,res)=>{
  const {email,password}=req.body;
    console.log(email);
  try{
    // get user by email
    const getUsersql='SELECT * FROM user WHERE email= '+connection.escape(email);
    const query=await connection.query(getUsersql,function(err,result){
      if(err) throw err;
      
       // if user email and password matches
        if(email==JSON.parse(JSON.stringify(result[0].email))&&bycrpt.compareSync(password,JSON.parse(JSON.stringify(result[0].password)))){
          const token =createJwt(JSON.parse(JSON.stringify(result[0].user_id)),JSON.parse(JSON.stringify(result[0].role)));
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