from flask import Flask,render_template,url_for,request
from flask.helpers import flash, make_response
from werkzeug.utils import redirect
from base64 import b64encode,b64decode
import json
import os

FLAG=os.getenv('FLAG') if os.getenv('FLAG') else 'flag{123}'
app=Flask(__name__)

@app.route('/')
def home():
    cookie=request.cookies.get('user')
    if(not cookie):
        return redirect(url_for('login'))
    c=str(b64decode(cookie).decode())
    user=json.loads(c)
    if user["admin"]:
        return render_template('index.html',flag=FLAG)
    return render_template('index.html')

@app.route('/login',methods=['GET','POST'])
def login():
    if(request.cookies.get('user')):
        return redirect(url_for('home'))
    if request.method=='POST':
        username=request.form.get("username")
        password=request.form.get("password")
        c={"username":username,"admin":False}
        c=json.dumps(c)
        c=bytes(c,'utf-8')
        cookie=b64encode(c).decode()
        r=make_response('logged In',302,{'Location':'/'});
        r.set_cookie('user',cookie)
        return r     
        
    return render_template('login.html')

@app.route('/logout')
def logout():
    r=make_response('logged out',302,{'Location':'/'});
    r.set_cookie('user', '', expires=0)
    return r




if __name__=="__main__":
    app.run(host="0.0.0.0")