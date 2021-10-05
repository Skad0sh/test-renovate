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

module.exports.cart=async function(req,res){
            if(!req.body.pid){
                res.json({message:"invalid prameters"})
                res.end();
                return;
            }
            const query="INSERT INTO cart (usr_id,pid) VALUES (?,?)";
            DB=db.db;
            let row= await db.data("Aneesh");
            let product= await db.getall("SELECT * FROM products WHERE pid=?",[req.body.pid])
            console.log(product)
            console.log(row);
                params=[row.id,req.body.pid]
                DB.run(query,params, function(err) {
                    if (err) {
                        console.log(err);
                        res.json({message:'error while updating db'})
                        res.end();
                        return;
                    }
                    res.json({message:"product added to cart"})
                });
    
}  


module.exports.buy=async function(req,res){
    if(!req.body.pid||!req.body.product_id){
        res.json({message:"invalid prameters"})
        res.end();
        return;
    }
    const query="INSERT INTO buy (usr_id,pid,qnty) VALUES (?,?,?)";
    DB=db.db;
    let row= await db.data("Aneesh");
    let product= await db.getall("SELECT * FROM products WHERE  pid=?",[req.body.pid])
    console.log(product[0].price)
    console.log(row[0].coins);
    console.log(row[0].coins>=product[0].price);
    if(row[0].coins>=product[0].price){
        params=[row[0].id,req.body.product_id,req.body.qnty]
        DB.run(query,params, function(err) {
            if (err) {
                console.log(err);
                res.json({message:'error while updating db'})
                res.end();
                return;
            }
            res.json({message:"product buyed"})
        });
    }else{
        res.json({message:"you have not enough money"})
    }
}