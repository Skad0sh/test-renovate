
db = require('./db')

module.exports.login=function(req,res){
    console.log(req.body)
    if(!req.body.name||!req.body.password){
        res.json({message:'Incorrect username or password'})
        res.end()
        return;
    }
    params=[req.body.name]
    query="SELECT * FROM users WHERE username=?";
    
    db.getall(query,params)
    .then((row)=>{
            if(!row[0]){
                res.json({message:"user dosenot exits"})
                res.end()
                return;
            }
             row=row[0];
             if(req.body.password===row.password){
                req.session.user=row.username;
                console.log('logged in',req.session.user)
                res.json({message:'Logged in sucessfully'})
            
            }else{
                console.log("worng")
                res.json({message:'Invalid username or password'})
            }
        })
    

};

module.exports.logout=function(req,res){
    delete req.session.user;
    res.redirect('/login')
}
