console.log(`Web Serverni boshlash`);

const express = require("express");
const app = express();
const fs = require("fs");

// let user;
// fs.readFile(`database/user.json`, `utf8`, (err, data) => {
//   if (err) {
//     console.log(`ERROR: `, err);
//   } else {
//     user = JSON.parse(data);
//   }
// });

// MongoDB chaqirish
// const db = require("./server").db();
const db = require("./server"); // server.js now exports the db handle directly
const mongoDB = require("mongodb");

// 1-> bosqich ->Kirish codelari
// expressga kirib kelayotgan ma'lumotlarga oid boshqichlar yoziladi
app.use(express.static("public")); // -> kirib kelayotgan requestlar uchun public folderi ochiq deagn ma'noni anglatadi.
app.use(express.json()); //-> kirib kelayotgan json formatdagi datani objectga o'zhartirib beradi. Client va server ortasidagi data json korinishida boladi .
app.use(express.urlencoded({ extended: true })); // formdan kelgan requestlarni qabul qilish uchun

//2-bosqich Session boyicha bo'lim

//3-bosqich-> view backend yashash uchun , frontend yasaladi backendni ichida-> VIEWsgabog'liq codelar
app.set("views", "views"); // folderlarni korsatyapmiz ,
app.set("view engine", "ejs"); // view engine bu ejs ekanligi korsatilyapdi

//4-bosqich->Routing bog'liq codelar
// app.get("/hello", function(req,res){
//     res.end(`<h1>Hello World </h1>`);
// });
// app.get("/gift", function(req,res){
//     res.end(`<h1>Siz sovg'alar sahifasidasiz</h1>`);
// });
// app.get("/", function(req,res){
//     res.end(`<h1>Hello World </h1>`);
// });

// app.post(`/create-item`, (req, res) => {
//   console.log(`User entered /create-item`);
//   console.log(req.body);
//   const new_reja = req.body.reja;
//   db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
//     console.log(data.ops);
//     res.json(data.ops[0]);
//   });
// });
app.post(`/create-item`, async (req, res) => {
  console.log(`User entered /create-item`);
  console.log(req.body);
  const new_reja = req.body.reja;
  try {
    const newDoc = { reja: new_reja };
    const result = await db.collection("plans").insertOne(newDoc);
    res.json({ _id: result.insertedId, ...newDoc });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "something went wrong" });
  }
});

// app.post(`/delete-item`, (req, res) => {
//   const id = req.body.id;
//   db.collection(`plans`).deleteOne(
//     { _id: new mongoDB.ObjectId(id) },
//     function (err, data) {
//       res.json({ state: "success" });
//     },
//   );
// });
app.post(`/delete-item`, async (req, res) => {
  const id = req.body.id;
  try {
    await db.collection(`plans`).deleteOne({ _id: new mongoDB.ObjectId(id) });
    res.json({ state: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ state: "error" });
  }
});

// app.post("/edit-item", (req, res) => {
//   const data = req.body;
//   console.log(data);
//   db.collection("plans").findOneAndUpdate(
//     { _id: new mongoDB.ObjectId(data.id) },
//     { $set: { reja: data.new_input } },
//     function (err, data) {
//       res.json({ state: "Success" });
//     },
//   );
// });
app.post("/edit-item", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    await db.collection("plans").findOneAndUpdate(
      { _id: new mongoDB.ObjectId(data.id) },
      { $set: { reja: data.new_input } }
    );
    res.json({ state: "Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ state: "error" });
  }
});

// app.get(`/author`, (req, res) => {
//   res.render(`author`, { user: user });
// });

// app.post("/delete-all", (req,res) => {
//   if(req.body.delete_all) {
//     db.collection("plans").deleteMany(function() {
//       res.json({state: "Hamma rejalar o'chirildi!"})
//     })
//   }
// })
app.post("/delete-all", async (req, res) => {
  if (req.body.delete_all) {
    try {
      await db.collection("plans").deleteMany({});
      res.json({ state: "Hamma rejalar o'chirildi!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ state: "error" });
    }
  } else {
    res.status(400).json({ state: "delete_all flag missing" });
  }
});

// app.get(`/`, function (req, res) {
//   console.log(`User entered /`);
//   db.collection("plans")
//     .find()
//     .toArray((err, data) => {
//       if (err) {
//         console.log(err);
//         res.end("something went wrong");
//       } else {
//         res.render(`reja`, { items: data });
//       }
//     });
// });
app.get(`/`, async function (req, res) {
  console.log(`User entered /`);
  try {
    const data = await db.collection("plans").find().toArray();
    res.render(`reja`, { items: data });
  } catch (err) {
    console.log(err);
    res.end("something went wrong");
  }
});

module.exports = app;