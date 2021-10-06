const express = require("express");
const router = express.Router();
const connection = require('./db');
// create 
router.post('/add-auctioner',(req,res)=>{
const {auctioner}=req.body; 

const check='SELECT * FROM auctioner WHERE real_estate_company = '+connection.escapeId(auctioner);
connection.query(check,function(error,result){
    if(error) throw error;
    if(result.length>0){
        res.send("Company exist in the database");
    }
});
const add='INSERT INTO auctioner (real_estate_company) VALUES(?) ';
    connection.query(add,[auctioner],function(err,result){
        if(err) throw err;
        res.send(auctioner+"/n"+"is added")
    });
});
// get 
router.get('/get-auctioners',(req,res)=>{
    const get='SELECT * FROM auctioner';
    connection.query(get,function(error,result){
        if(error) throw error;
        res.send(result);
    });

});
// get individual
router.get('/get-auctioner/:id',(req,res)=>{
    const {id}=req.params;
    try{
        const get ='SELCT * FROM auctioner WHERE auction_id ='+connection.escapeId(id);
        
    }catch(err){
        console.log(err.message);
    }

});
// update 
router.put('/update-auctioner/:id',(req,res)=>{

});

// delete 
router.delete('/delete-auctioner/:id',(req,res)=>{

});

module.exports=router;