import requests
import xmltodict
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
session = requests.Session()

stdNum = sys.argv[1]
password = sys.argv[2]

data = {
    'email': stdNum,
    'password': password,
}

# 2 : 로그인 URL로 POST 요청 및 sso token(Cookie) 획득
session.post('https://do.sejong.ac.kr/ko/process/member/login', data=data)


# 3 : uis로 로그인하여 인증된 세션 획득
res = session.get('https://do.sejong.ac.kr/')
print(res.text)
#j_data = json.loads(json.dumps(xmltodict.parse(res.text), ensure_ascii=False))

# print(j_data)
'''
# print(j_data["root"]["listMain"]["list"]["student_no"])
# print(j_data["root"]["listMain"]["list"]["nm"])
# print(j_data["root"]["listMain"]["list"]["sch_dept_alias"])
'''
