var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const { PythonShell } = require("python-shell");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  var html = `
    <form action="/login" method="post">
        <p><input type ="text" name ="id" placeholder="학번"/></p>
        <p><input type ="password" name ="pw" placeholder="비밀번호"/></p>
        <p><input type="submit" value="로그인"/></p>
    </form>
  `;
  res.send(html);
});

app.post("/login", (req, res) => {
  var options = {
    mode: "text",
    pythonPath: "",
    pythonOptions: ["-u"],
    scriptPath: "",
    args: [req.body.id, req.body.pw]
  };
  PythonShell.run("test.py", options, (err, results) => {
    if (err) throw err;

    console.log("results : ", results);
    res.send(results.data);
  });
});

app.listen(3000, () => {
  console.log("connection!");
});
