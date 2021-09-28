const jwt =require('jsonwebtoken');
require("dotenv").config();
function createJwt(id){
    console.log(id);
    const token =jwt.sign({user:id},process.env.asdJwt,{expiresIn:'1h'});
    return token; 
}

module.exports=createJwt;