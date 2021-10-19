const db= require('./db');

async function add_balance(){
    let user=await db.data("Aneesh");
    let coins=user[0].coins+100;
    console.log('add_balance :',user[0].coins);
    const query='UPDATE users SET coins=? where username=?';
    params=[coins,"Aneesh"];
    await db.run(query,params);

};

async function update_gift(){
    let user=await db.data("Aneesh");
    console.log('add_balance :',user[0].coins);
    let gift=user[0].gift-100
    const query2='UPDATE users SET gift=? where username=?'
    params2=[gift,"Aneesh"]
    await db.run(query2,params2);
}

module.exports.transfer=async(req,res)=>{
    if(!req.body.code) res.json({message:"Invadid code"})
    let code = req.body.code;
    let user=await db.data("Aneesh");
    let gift=user[0].gift;
    if(gift>=100){
        
        const trans1= add_balance();
        const trans2=update_gift();
        await trans1;
        await trans2;
        res.json({message:"congratz"})
    }else{
        res.json({message:"alreadly redeed"})
    }


};
module.exports.reset=async(req,res)=>{
    const query='UPDATE users SET gift=? where username=?';
    const query2='UPDATE users SET coins=? where username=?'
    params=[100,"Aneesh"];
    await db.run(query,params);
    await db.run(query2,params);
    res.json({message:"reset completed"})

}