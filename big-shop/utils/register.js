db = require('./db').db

module.exports.register=function(req,res){
    console.log(req.body)
    var mydate = new Date();
    if(!req.body.name||!req.body.password){
        res.json({message:'error while registring'})
        res.end()
        return;
    }
    params=[req.body.name,req.body.password,100]
    query="INSERT INTO users(username,password,coins) VALUES(?,?,?)";
    db.run(query,params, function(err) {
        if (err) {
            res.json({message:'error while registring'})
            res.end();
            return;
        }
        res.json({
            status:true,
            message:'user registered sucessfully'
        })
    });
    
  //todo check if login ,check username and password for dupes  

};
