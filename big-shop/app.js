const express = require('express');
const session = require('express-session')
const fs    = require('fs');
const path  = require('path');
const Register= require('./utils/register');
const Login=require('./utils/login');
const cart=require('./utils/cart');
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


app.get('/',(req,res)=>{res.sendFile(path.resolve(__dirname,'./static/index.html'))});
app.get('/login',(req,res)=>{res.sendFile(path.resolve(__dirname,'./static/login.html'))});
app.get('/register',(req,res)=>{res.sendFile(path.resolve(__dirname,'./static/register.html'))});
app.post('/register',Register.register);
app.post('/login',Login.login);
//add below routes after auth


app.use((req,res,next)=>{
            if(!req.session.user){
                res.json({message : 'not logged in'})
                res.end()
                return;
            }
            next();
})

app.get('/products',cart.products);
app.post('/add',cart.cart);
app.post('/buy',cart.buy);
app.get('/cart',cart.show_cart);
app.get('/buyed',cart.show_buy);

app.listen(3000,()=>{
    console.log("server started at port 3000")
});

