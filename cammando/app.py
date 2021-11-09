from flask import Flask,render_template,url_for,request
from flask.helpers import flash, make_response
from werkzeug.utils import redirect
import subprocess

def cmd_exec(cmd):
    ps=subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
    subprocess_return=ps.stdout.read()
    return subprocess_return

app=Flask(__name__)

@app.route('/',methods=['GET','POST'])
def home():
    if request.method=='POST':
        name=request.form.get('name')
        cmd='figlet '+str(name)
        out=cmd_exec(cmd)
        out=out.decode()
        #out=out.replace('\n','<br>')
        return render_template('index.html',output=out)
    return render_template('index.html')


if __name__=="__main__":
    app.run(debug=True)