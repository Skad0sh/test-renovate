const db= require('./db');

async function add_balance(user_name){
    let user=await db.data(user_name);
    let coins=user[0].coins+100;
    console.log('add_balance :',user[0].coins);
    const query='UPDATE users SET coins=? where username=?';
    params=[coins,user_name];
    await db.run(query,params);

};

async function update_gift(user_name){
    let user=await db.data(user_name);
    console.log('update:',user[0].coins);
    let gift=user[0].gift-100
    const query2='UPDATE users SET gift=? where username=?'
    params2=[gift,user_name]
    await db.run(query2,params2);
}

module.exports.transfer=async(req,res)=>{
    if(!req.body.code) res.json({message:"Invadid code"})
    let code = req.body.code;
    if(code!='Gift_card_42f5ea20'){
        res.json({message:'invalid coupon code'});
        res.end();
        return;
    }
    let user=await db.data(req.session.user);
    let mes=""
    console.log(req.session.user)
    let gift=user[0].gift;
    if(gift>=100){
        
        const trans1= add_balance(req.session.user);
        const trans2=update_gift(req.session.user);
        await trans1;
        await trans2;
         mess="congratz";
    }else{
        mess="alreadly redeemed";
    }
    res.json({message : mess});


};
module.exports.reset=async(req,res)=>{
    const query='UPDATE users SET gift=? where username=?';
    const query2='UPDATE users SET coins=? where username=?'
    params=[100,"a"];
    await db.run(query,params);
    await db.run(query2,params);
    res.json({message:"reset completed"})

}