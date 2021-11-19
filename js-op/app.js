const cookie = require('cookie');
const express = require("express");
const path=require('path')
const app = express();
app.use(express.static('./static'))
app.use(express.urlencoded({ extended: true }));



app.get('/',(req,res)=>{  
    res.sendFile(path.resolve(__dirname,'./public/index.html'))
})

app.listen(1339, () => {
    console.log(`Listening on http://localhost:1339`);
});
  