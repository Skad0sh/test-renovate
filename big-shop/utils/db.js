const sqlite3 = require('sqlite3').verbose();
const path =require('path');

const db = new sqlite3.Database(path.resolve(__dirname,'./cart.db'),sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });


///returns all data of query
getall = (query,params)=>{
    return new Promise((resolve,reject)=>{
       
        db.all(query,params,(err,row)=>{
            if(err) reject(err);
            resolve(row)
        });
    });
};

// db.run(`INSERT INTO users(username,password,coins) VALUES(?,?,?)`, ['sadf','asdfa',100], function(err) {
run =(query,params)=>{
    db.run(query,params, function(err) {
        if (err) {
        return console.log(err.message);
        }
    });
};


data= async() => {
    let user = await getall('SELECT * FROM users',[])
    console.log(user);
}
// const user = data()
// console.log(user);
data()
module.exports={getall,run,db}