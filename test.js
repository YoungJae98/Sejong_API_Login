var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var axios = require("axios");
var convert = require("xml-js");
const { PythonShell } = require("python-shell");
const { post } = require("request");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  var html = `
    <form action="https://do.sejong.ac.kr/ko/process/member/login" method="post">
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
  axios
    .post("https://do.sejong.ac.kr/ko/process/member/login", {
      email: email,
      password: password
    })
    .then((response) => {
      console.log(response);
      res.send("hello");
    });

  //   request.post(
  //     {
  //       uri: "https://do.sejong.ac.kr/ko/process/member/login",
  //       form: dataObj,
  //       json: true
  //     },
  //     (err, sessionResponse, body) => {
  //       var cookie = sessionResponse.caseless["dict"]["set-cookie"];
  //       request.get(
  //         {
  //           uri: "https://do.sejong.ac.kr/ko/process/member/login",
  //           headers: {
  //             Cookie: cookie
  //           }
  //         },
  //         (err, response, body) => {
  //           res.send(response.body);
  //         }
  //       );
  //     }
  //   );
});

app.listen(3000, () => {
  console.log("connection!");
});
