const express=require('express');
const trans=require('./utils/transfer')
const path=require('path')
const app=express();
app.use(express.static('./public'));

app.use(express.urlencoded({extended : false}));
app.get('/',(req,res)=>{res.sendFile(path.resolve(__dirname,'./static/race.html'))})
app.post('/transfer',trans.transfer);
app.get('/reset',trans.reset);

app.listen(3001,()=>{
    console.log('server started')
})