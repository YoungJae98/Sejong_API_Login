var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var axios = require("axios");
var tough = require("tough-cookie");
var FormData = require("form-data");
var axiosCookieJarSupport =
  require("@3846masa/axios-cookiejar-support").default;
var { JSDOM } = require("jsdom");

var instance = axios.create({ withCredentials: true });
axiosCookieJarSupport(instance);
instance.defaults.jar = new tough.CookieJar();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  var html = `
    <form action="/login" method="post">
        <p><input type ="text" name ="email" placeholder="학번"/></p>
        <p><input type ="password" name ="password" placeholder="비밀번호"/></p>
        <p><input type="submit" value="로그인"/></p>
    </form>
  `;
  res.send(html);
});

app.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var bodyFormData = new FormData();

  bodyFormData.append("email", email);
  bodyFormData.append("password", password);

  instance
    .post("https://do.sejong.ac.kr/ko/process/member/login", bodyFormData, {
      withCredentials: true,
      headers: bodyFormData.getHeaders()
    })
    .then((response) => {
      instance.get("https://do.sejong.ac.kr/").then((response) => {
        let content = response.data;
        let jdom = new JSDOM(content);
        let parsing =
          jdom.window.document.querySelector("div.info").textContent;
        let name = parsing.replace(/\t/g, "").split("\n")[1];
        let depart = parsing.replace(/\t/g, "").split("\n")[2].split(" ")[1];
        console.log("이름 : ", name, "학과 : ", depart);
        res.send("hello");
      });
    });
});

app.listen(3000, () => {
  console.log("connection!");
});

// request.post(
//   {
//     uri: "https://do.sejong.ac.kr/ko/process/member/login",
//     form: {
//       email: email,
//       password: password
//     },
//     json: true
//   },
//   (err, sessionResponse, body) => {
//     var cookie = sessionResponse.caseless["dict"]["set-cookie"];
//     res.send(body);
//     // request.get(
//     //   {
//     //     uri: "https://do.sejong.ac.kr/ko/process/member/login",
//     //     headers: {
//     //       Cookie: cookie
//     //     }
//     //   },
//     //   (err, response, body) => {
//     //     res.send(response.body);
//     //   }
//     // );
//   }
// );
