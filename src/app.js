const express = require("express");
const cors = require("cors");
// const http = require("http");
// const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const connectDb = require("./connection/db");
const allRoutes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT;

// -----creating app-------------------
const app = express();

// ----using middleware----
app.use(cors());
app.use(bodyParser.json());
// -----------------------

app.use("/",allRoutes);

app.get("/", (req, res) => {
  res.send("Api is Running Successfully");
});

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("connection", socket.id);

//   socket.on("send_message", (message) => {
//     console.log("sent_message", message);
//   });
// });

// -----socket.IO connection -----------------------------------

connectDb(); // call this function to connect to the database

app.listen(PORT, () => {
  console.log("app is running on port ", PORT);
});
