const db=require('./db')

module.exports.products=function(req,res){
    const query="SELECT * FROM products";
    db.getall(query,[])
    .then((row)=>{
        res.json(row);
        res.end()
        return;
    })
    .catch(()=>{
        res.json({message:"db error"})
    })
}