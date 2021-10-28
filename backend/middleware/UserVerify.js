const validator=require('validator');
const connection = require("../db");

module.exports=function(req,res,next){
    const passwordValidator = require('password-validator');
    var schema = new passwordValidator();
    const {firstName,lastName,email,password,confirmedPassword}=req.body;
    console.log(confirmedPassword);
    var errorOut=[];
  
    
    function verifyEmail(email){
    if(!validator.isEmail(email)){
     errorOut.push({emailError:"Email format not correct or filled in"});
    }
    }

    function checkFirstNameLength(firstName){
        if(firstName.length==0){
           errorOut.push({firstNameError:"First name is not filled in"});
        }
    }
    function checkLastNameLength(lastName){
        if(lastName.length==0){
         errorOut.push({lastNameError:"Last name is not filled in"});

        }
    }
    function checkPassLength(password){
        if(password.length==0){
          errorOut.push({passError:"Password is not filled in"});
            return true;
        }
        return false;
    }
    function passwordValid(password){
        schema.is().min(6)
        .is().max(20)
        .has().lowercase()                              
        .has().digits()                               
        .has().not().spaces();   
        
        if(!schema.validate(password)){
            errorOut.push({passError:"Password must be 6 to 20 character with which contains a number and lower case letters"});
        }
    }

    function errorOutput(errorArr){
        if(errorArr.length>0){
            console.log("output error array");
         next(res.json(errorOut));
        }
    }
    function checkEmailExist(email){
        if(email.length>0){
            const getEmailSql="SELECT * FROM user WHERE email =" + connection.escape(email);
            const get = connection.query(getEmailSql, (err, data) => {
              if (err) {
                console.error(err);
                return;
              }
               if(data.length>0){
                 errorOut.push({emailErrorExist:"This email is already being used"});
               }
            });
        
          }
    }

    if(req.path=="/signup"){
       verifyEmail(email);
       checkFirstNameLength(firstName);
      checkLastNameLength(lastName);
      if(!checkPassLength(password)){
      passwordValid(password);
      }
    
    }

    if(req.path=="/login"){
        verifyEmail(email);
        checkPassLength(password);
        
    }

    if(req.path=="/update-user-password"){
        if(!checkPassLength(password)){
            passwordValid(password);
            }      
    }
    if(req.path=="/update-user-themselves"||req.path=="/update-user/:id"){
       if(email.length>0){
        verifyEmail(email);
       }
       checkEmailExist(email);
       if(email.length==0&&firstName.length==0&&lastName.length==0){
        errorOut.push({editUserError:"One field must be filled in order to update details"});
       }
       console.log(errorOut);
    }

errorOutput(errorOut);
next();


}
