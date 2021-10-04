const jwt =require('jsonwebtoken');
require("dotenv").config();

const verifyTokken=(req,res,next)=>{
const token=req.header("jwt");
console.log(token);
if(!token){
    return res.status(403).send("requires token");
}
try{
    const decode=jwt.verify(token,process.env.asdJwt);
   // console.log(decode);
    req.user={id:decode.id,role:decode.role};
    //req.user=decode.role;
    
    next();
}catch(err){
    return res.status(401).send("Invalid Token");

}
return next();
}

module.exports=verifyTokken;