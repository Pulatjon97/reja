const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString =
  "mongodb+srv://John97:maylida@cluster0.gxqiopy.mongodb.net/?appName=Cluster0";

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("ERROR on cnnection MongoDB", err);
    else {
      console.log("MongoDb connection secceed!");

      // CHANGED: instead of "module.exports.exports = client" (which stored the
      // whole client under a property literally named "exports" — not usable
      // as app.js's require("./server").db()), we now export an actual "db"
      // function that returns the connected database. This matches what
      // app.js expects to call.
      db = client.db("Reja");
      module.exports.db = function () {
        return db;
      };

      const app = require("./app");
      const server = http.createServer(app);
      let PORT = 3000;
      server.listen(PORT, function () {
        console.log(
          `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`,
        );
      });
    }
  },
);




// const http = require("http");
// const mongodb = require("mongodb");

// let db;
// const connectionString =
//   "mongodb+srv://John97:maylida@cluster0.gxqiopy.mongodb.net/?appName=Cluster0";

// mongodb.connect(
//   connectionString,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err, client) => {
//     if (err) console.log("ERROR on cnnection MongoDB", err);
//     else {
//       console.log("MongoDb connection secceed!");
//       module.exports.exports = client;

//       const app = require("./app");
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

