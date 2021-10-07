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
        if(money.length==0){
            errorOut.push("Value must be filled in");
        }
    }
    
    function errorOutput(errorArr){
        if(errorArr.length>0){
         next(res.json(errorOut));
        }
    }
    checkValue(number);
    valueLength(number);
  


errorOutput(errorOut);
next();


}


