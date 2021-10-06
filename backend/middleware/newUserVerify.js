
module.export=function(req,res,next){
    const {firstName,lastName,email,password}=req.body;

    function checkEmailLength(email){
        if(email.length==0){
            return res.send("Email not filled in");
        }
    }
    function checkFirstNameLength(firstName){
        if(firstName.length==0){
            return res.send("First name not filled");
        }
    }
    function checkLastNameLength(lastName){
        if(lastName.length==0){
            return res.send("Last name not filled");
        }
    }
    function checkPassLength(password){
        if(password.length==0){
            return res.send("Password not filled");
        }
    }

function verifyEmail(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

next();


}




