
db = require('./db')

module.exports.login=function(req,res){
    console.log(req.body)
    if(!req.body.name||!req.body.password){
        res.json({message:'Incorrect username or password'})
        res.end()
        return;
    }
    params=[req.body.name,req.body.password]
    query="SELECT * FROM users WHERE username=? and password=?";
    
    db.getall(query,params)
    .then((row)=>{
        console.log(row)
            if(!row[0]){
                res.json({message:"Invalid username or password"})
                res.end()
                return;
            }          
            else{
                req.session.user=row[0].username;
                console.log('logged in as :',req.session.user)
                res.json({message:'Logged in sucessfully'})
            
            }
        })
    

};

module.exports.logout=function(req,res){
    delete req.session.user;
    res.redirect('/login')
}
