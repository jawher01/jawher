console.clear();
const express = require("express");
const path = require("path");

const connectDB = require("./config/dbConnect");
const app = express();
require("dotenv").config();
const cors = require('cors')



// connect to DB
connectDB();



// routes
app.use(express.json());
app.use(cors());

app.use("/user", require("./routes/user"));
app.use("/user/publication", require("./routes/publications"));
app.use("/user/comment", require("./routes/comment"));

app.use(express.static(path.join(__dirname, "client/build")));

// server
const PORT = process.env.PORT || 9000;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is running on ${PORT}`)
);




