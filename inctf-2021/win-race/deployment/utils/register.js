const db = require('./db')

module.exports.register=async function(req,res){
    //console.log(req.body)
    if(!req.body.name||!req.body.password){
        res.json({message:'error while registring'})
        res.end()
        return;
    }
    params=[req.body.name,req.body.password,100,100]
    query="INSERT INTO users(username,password,coins,gift) VALUES(?,?,?,?)";
    try {
        await db.check(req.body.name)
        await db.run(query,params);
        res.json({message:"user registed sucessfully"});
        
    } catch (error) {
        console.log(error)
        if(error==="user already exists") res.json({message : error})
        else res.json({message : "error while registering"})
        
    }   
};
module.exports.delete=async function(req,res){
    let user=await db.data(req.session.user);
    let id=user[0].id
    let del_usr='DELETE FROM users WHERE id=? ';
    let del_cart='DELETE FROM cart WHERE usr_id=?';
    try {
        await db.run(del_usr,[id]);
        await db.run(del_cart,[id]);
        req.session.destroy();
        message='sucess';
    } catch (error) {
        message='fail';
    }
    if(message=='sucess'){
        res.redirect('/login');
    }

};


