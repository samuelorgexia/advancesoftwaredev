
module.export=function(req,res,next){
    const {firstName,lastName,email,password}=req.body;
function verifyEmail(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
next();


}




