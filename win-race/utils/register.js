const db = require('./db')

module.exports.register=async function(req,res){
    console.log(req.body)
    if(!req.body.name||!req.body.password){
        res.json({message:'error while registring'})
        res.end()
        return;
    }
    params=[req.body.name,req.body.password,100]
    query="INSERT INTO users(username,password,coins) VALUES(?,?,?)";
    try {
        await db.check(req.body.username)
        await db.run(query,params);
        res.json({message:"user registed sucessfully"});
        
    } catch (error) {
        console.log(error)
        if(error==="user already exists") res.json({message : error})
        else res.json({message : "error while registering"})
        
    }
    
  //todo check if login ,check username and password for dupes  

};
