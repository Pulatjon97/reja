console.log("Web Serverni boshlash");
const express = require("express");
const app = express(); 
const http = require("http")

//1: Kirish kodlari
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//2: Sessionga bog'liq kodlar
//3: Viewsga bog'liq kodlar
app.set("views", "views");
app.set("view engine", "ejs");

//4: Routingga bog'liq kodlar
app.get("/hello", function(req, res) {
    res.end(`<h1 style="background: green" >HELLO WORLD! <br> by <br>JOHN</h1>`);
});
app.get("/gift", function(req, res) {
    res.end(`<h1 style="background: green" >Sisz sovg'alar bo'limidasiz!</h1>`);
});

const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function() {
    console.log(`THe server is running successfully on port: ${PORT}`);
});
 