const connection = require("../db");
module.exports=function(req,res,next){
    const {budget}=req.body;
    
    var errorOut=[];
    const number=parseInt(budget);
    function checkValue(money){
        if(money<=0){
            errorOut.push("Must be above 0.00 ");
            
        }
        
    }
    function valueLength(money){
        
        if(money.length==null){
            errorOut.push("Value must be filled in");
            console.log("works");
            return true;
        }
        return false;
        
    }
    function checkForChara(money){
        if((/[a-zA-z]/).test(money)){
            errorOut.push("Field is not filled in or contains characters not numbers");
            return true;
        }
        return false;


    }
    
    function errorOutput(errorArr){
        if(errorArr.length>0){
         next(res.json(errorOut));
        }
    }

        if(!checkForChara(number)){
            checkValue(number);
        }
    



errorOutput(errorOut);
next();


}


