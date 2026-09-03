console.log("Web Serverni boshlash");
const express = require("express");
const res = require("express/lib/response");
const app = express();
const fs = require("fs");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
  if (err) {
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
  console.log("user entered /create-item");
  const new_reja = req.body.reja;
  db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    if (err) {
      console.log(err);
      // CHANGED: res.end('Something went wrong!') -> res.json(...) so
      // reja.ejs's fetch(...).then(res => res.json()) can parse the
      // response without throwing a JSON parse error.
      // res.end('Something went wrong!');
      res.json({ test: "error", message: "Something went wrong!" });
    } else {
      // CHANGED: res.end('Successfully added!') -> res.json(...), and now
      // also returns the new item's text and its MongoDB _id, so the
      // frontend can build the row with a working data-id immediately,
      // without needing a page reload.
      // res.end('Successfully added!')
      res.json({ test: "success", item: new_reja, id: data.insertedId });
    }
  });

  // const item = req.body.reja;
  // res.json({ test: "success", item: item });
});
// END: /create-item route

app.get("/author", (req, res) => {
  res.render("author", { user: user });
});

// CONFIRMED: this route already correctly fetches saved plans and passes
// them into the template as "items" — no change needed here. Just make
// sure reja.ejs loops over a variable called "items" (not "plans") to
// match this key exactly.
app.get("/", function (req, res) {
  console.log("user entered / ");
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        res.end("Something went wrong!");
      } else {
        res.render("reja", { items: data });
      }
    });
});

module.exports = app;
