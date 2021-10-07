const validator=require('validator');

module.exports=function(req,res,next){
    const passwordValidator = require('password-validator');
    var schema = new passwordValidator();
    const {firstName,lastName,email,password}=req.body;
    var errorOut=[];
  
    
    function verifyEmail(email){
    if(!validator.isEmail(email)){
     errorOut.push("Email format not correct or filled in");
    }
    }

    const checkEmailLength=(email)=>{
        if(email.length==0){
            errorOut.push("Email is not filled in");
        }
    }
    function checkFirstNameLength(firstName){
        if(firstName.length==0){
           errorOut.push("First name is not filled in");
        }
    }
    function checkLastNameLength(lastName){
        if(lastName.length==0){
         errorOut.push("Last name is not filled in");

        }
    }
    function checkPassLength(password){
        if(password.length==0){
          errorOut.push("Password is not filled in");

        }
    }
    function passwordValid(password){
        schema.is().min(6)
        .is().max(20)
        .has().lowercase()                              
        .has().digits()                               
        .has().not().spaces();   
        
        if(!schema.validate(password)){
            errorOut.push("Password must be 6 to 20 character with which contains a number and upper and lower case letters");
        }
    }

    function errorOutput(errorArr){
        if(errorArr.length>0){
         next(res.json(errorOut));
        }
    }

    if(req.path=="/signup"){
       verifyEmail(email);
       checkFirstNameLength(firstName);
      checkLastNameLength(lastName);
      checkPassLength(password);
      passwordValid(password);
    
    }

    if(req.path=="/login"){
        verifyEmail(email);
        checkPassLength(password);
        
    }

    if(req.path=="/update-user-password"){
        checkPassLength(password);
        passwordValid(password);
    }
    if(req.path=="/update-user-themselves"||req.path=="/update-user/:id"){
       if(email.length>0){
        verifyEmail(email);
       }
    }

errorOutput(errorOut);
next();


}




