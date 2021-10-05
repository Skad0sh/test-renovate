const sqlite3 = require('sqlite3').verbose();
const path =require('path');

const db = new sqlite3.Database(path.resolve(__dirname,'./cart.db'),sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

/*
CREATE TABLE users (
id INTEGER PRIMARY KEY AUTOINCREMENT ,
username TEXT NOT NULL,
password TEXT NOT NULL UNIQUE
, coins);
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE products (
pid INTEGER PRIMARY KEY AUTOINCREMENT ,
p_name TEXT NOT NULL UNIQUE ,
price INTEGER NOT NULL );
CREATE TABLE cart (
usr_id INTEGER NOT NULL PRIMARY KEY ,
pid INTEGER NOT NULL,
qnty INTEGER  NOT NULL);
 */


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


data= async(user) => {
    let id = await getall('SELECT * FROM users where username=?',[user])
    return id;
}


// const user = data()
// console.log(user);
//data()
module.exports={getall,run,db,data}