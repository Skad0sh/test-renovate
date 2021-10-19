const express = require('express');
const session = require('express-session')
const fs    = require('fs');
const path  = require('path');
const Register= require('./utils/register');
const Login=require('./utils/login');
const cart=require('./utils/cart');
const trans=require('./utils/transfer')
const multer = require('multer');
const forms = multer();

app= express();
app.use(express.static('./public'));
app.use(forms.array()); 
app.use(express.urlencoded({extended : false}));
app.use(session({
    //need change on deployment
    secret: 'asdfasdfasdf',
    resave: false,
    saveUninitialized: true,
  }))



app.get('/login',(req,res)=>{res.sendFile(path.resolve(__dirname,'./static/login.html'))});
app.get('/register',(req,res)=>{res.sendFile(path.resolve(__dirname,'./static/register.html'))});
app.post('/register',Register.register);
app.post('/login',Login.login);

app.use((req,res,next)=>{
            if(!req.session.user){
                res.redirect('/login')
                return;
            }
            next();
});
app.get('/',(req,res)=>{res.sendFile(path.resolve(__dirname,'./static/index.html'))});
app.get('/cart',(req,res)=>{res.sendFile(path.resolve(__dirname,'./static/cart.html'))});
app.get('/cart',(req,res)=>{res.sendFile(path.resolve(__dirname,'./static/race.html'))});
app.get('/api/products',cart.products);
app.get('/api/user',cart.user);
app.get('/api/cart',cart.show_cart);
app.post('/transfer',trans.transfer);
app.post('/add',cart.cart);
app.post('/buy',cart.buy);
app.post('/open',cart.open);
app.get('/logout',Login.logout);
app.listen(3001,()=>{
    console.log("server started at port 3001")
});

