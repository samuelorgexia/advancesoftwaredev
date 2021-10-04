const jwt =require('jsonwebtoken');
require("dotenv").config();
function createJwt(id,role){
    console.log(id);
    console.log(role);
    const token =jwt.sign({id:id,role:role},process.env.asdJwt,{expiresIn:'1h'});
    return token; 
}

module.exports=createJwt;