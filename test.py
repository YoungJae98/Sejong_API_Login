import requests
import xmltodict
import json
import sys

# http://uis.sejong.ac.kr/app/sys.Login.servj
sys.stdout.reconfigure(encoding='utf-8')
session = requests.Session()

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36',
}

stdNum = sys.argv[1]
password = sys.argv[2]

data = {
    'id': stdNum,
    'password': password,
    'loginUrl': 'uisloginSSL.jsp',
    'rtUrl': 'uis.sejong.ac.kr/app/sys.Login.servj?strCommand=SSOLOGIN'
}

# 2 : 로그인 URL로 POST 요청 및 sso token(Cookie) 획득
res = session.post('https://portal.sejong.ac.kr/jsp/login/login_action.jsp', data=data, headers={
    'Referer': 'https://portal.sejong.ac.kr/jsp/login/uisloginSSL.jsp?rtUrl=uis.sejong.ac.kr/app/sys.Login.servj?strCommand=SSOLOGIN',
    'Content-Type': 'application/x-www-form-urlencoded'
})

# 3 : uis로 로그인하여 인증된 세션 획득
session.get('http://uis.sejong.ac.kr/app/sys.Login.servj')

# 4 : uis로 request해서 학사정보 획득
res = session.post('http://uis.sejong.ac.kr/app/modules/sch_sud/sch.SchStudentBaseInfo.do', data={
    'pgauth_sys_id': 'SELF_STUD',
    'pgauth_sub_id': 'SELF_SUB_20',
    'pgauth_menu_id': 'SELF_MENU_10',
    'pgauth_pg_id': 'SudMasterBodyE',
    'pgauth_self_yn': 'Y',
    'pgauth_orgn_clsf_map_cd': 'MAP-001',
    'pgauth_orgn_clsf_ctrl_yn': 'Y',
    'pgauth_auth_depth_cd': '9',
    'pgauth_upd_posb_yn': 'Y',
    'pgauth_dwn_posb_yn': 'Y',
    'pguser_member_no': stdNum,
    'param_member_no': stdNum,
    'strCommand': 'Student',
    'keyStudentNo': stdNum
})

j_data = json.loads(json.dumps(xmltodict.parse(res.text), ensure_ascii=False))
print(j_data["root"]["listMain"]["list"]["student_no"])
print(j_data["root"]["listMain"]["list"]["nm"])
print(j_data["root"]["listMain"]["list"]["sch_dept_alias"])
