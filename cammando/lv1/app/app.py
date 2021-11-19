from flask import Flask,render_template,url_for,request
from flask.helpers import flash, make_response
from werkzeug.utils import redirect
import subprocess
import random

def hsl():
    a=[str(random.randint(1,255))]
    a.append(str(100)+'%')
    a.append(str(random.randint(60,100))+'%')
    return ' '.join(a)
    


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
        return render_template('index.html',output=out,colour=hsl(),color2=hsl())
    return render_template('index.html')


if __name__=="__main__":
    app.run(debug=True,host="0.0.0.0")
