console.log("Web Serverni boshlash");
const express = require("express");
const res = require("express/lib/response");
const app = express();
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

// MongoDB chaqirish
const db = require("./server").db();

//1: Kirish kodlari
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2: Sessionga bog'liq kodlar
//3: Viewsga bog'liq kodlar
app.set("views", "views");
app.set("view engine", "ejs");

//4: Routingga bog'liq kodlar

// START: /create-item route - kelgan itemni javobda qaytarish (frontendda ro'yxatga qo'shish uchun)
app.post("/create-item", (req, res) => {
  console.log(req.body);
  const item = req.body.item;
  res.json({ test: "success", item: item });
});
// END: /create-item route

app.get('/author', (req, res) => {
    res.render("author", {user: user});
})
app.get("/", function (req, res) {
  res.render("reja");
});

module.exports = app;

