import requests
import json
import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')
session = requests.Session()

stdNum = sys.argv[1]
password = sys.argv[2]

data = {
    'email': stdNum,
    'password': password,
}

# 2 : 로그인 URL로 POST 요청 및 sso token(Cookie) 획득
res = session.post(
    'https://do.sejong.ac.kr/ko/process/member/login', data=data)

if(res.text[17:21] == 'true'):
    print(res.text[17:21])

    # 3 : uis로 로그인하여 인증된 세션 획득
    res = session.get('https://do.sejong.ac.kr/')

    soup = BeautifulSoup(res.text, 'html.parser')
    data = soup.find_all('div', class_='info')
    cnt = 0

    print(stdNum)
    for i in data:
        print(i.get_text())
else:
    print("false")
