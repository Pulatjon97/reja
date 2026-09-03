console.log("Web Serverni boshlash");
const express = require("express");
const res = require("express/lib/response");
const app = express();
const http = require("http");
const fs = require("fs");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
    if(err) {
        console.log("ERROR", err);   
    } else {
        user = JSON.parse(data);
    }
});
fs.readFile("database/user.json", "utf8", (err, data) => {
  if (err) {
    console.log("ERROR", err);
  } else {
    user = JSON.parse(data);
  }
});

//1: Kirish kodlari
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2: Sessionga bog'liq kodlar
//3: Viewsga bog'liq kodlar
app.set("views", "views");
app.set("view engine", "ejs");

//4: Routingga bog'liq kodlar
app.post("/create-item", (req, res) => {
  console.log(req.body);
  res.json({ test: "success" });
});
app.get('/author', (req, res) => {
    res.render("author", {user: user});
})
app.get("/", function (req, res) {
  res.render("harid");
});

const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function () {
  console.log(
    `THe server is running successfully on port: ${PORT}, http://localhost:${PORT}`,
  );
});
