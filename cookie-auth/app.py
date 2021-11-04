from flask import Flask,render_template,url_for,request
from flask.helpers import make_response
from werkzeug.utils import redirect
from base64 import b64encode,b64decode
import json

app=Flask(__name__)

@app.route('/')
def home():
    cookie=request.cookies.get('user')
    if(not cookie):
        return redirect(url_for('login'))
    
    return render_template('index.html')

@app.route('/login',methods=['GET','POST'])
def login():
    if request.method=='POST':
        username=request.form.get("username")
        password=request.form.get("password")
        c={"username":username,"admin":False}
        c=json.dumps(c)
        c=bytes(c,'utf-8')
        cookie=b64encode(c).decode()
        r=make_response("logged IN :)",200)
        r.set_cookie('user',cookie)
        return r     
        
    return render_template('login.html')

@app.route('/about')
def about():
    return redirect(url_for('home'))




if __name__=="__main__":
    app.run(debug=True)