const http = require("http");

// const mongodb = require("mongodb");
const { MongoClient } = require("mongodb");

let db;
const connectionString =
  "mongodb+srv://John97:maylida@cluster0.gxqiopy.mongodb.net/?appName=Cluster0";

// mongodb.connect(
//   connectionString,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err, client) => {
//     if (err) console.log("Error on connection MongoDB");
//     else {
//       console.log("MongoDB connection succeed");
//
//       module.exports = client;
//       const app = require(`./app`);
//       const server = http.createServer(app);
//       let PORT = 3000;
//       server.listen(PORT, function () {
//         console.log(
//           `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`,
//         );
//       });
//     }
//   },
// );

const client = new MongoClient(connectionString);

async function start() {
  try {
    await client.connect();
    console.log("MongoDB connection succeed");

    db = client.db();
    module.exports = db;

    const app = require("./app");
    const server = http.createServer(app);
    let PORT = 9007;

    server.listen(PORT, function () {
      console.log(
        `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`,
      );
    });
  } catch (err) {
    console.error("Error on connection MongoDB:", err);
  }
}

start();