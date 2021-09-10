const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes/Routes");

const _DB_CON = process.env.WHISKYDB_URI || "mongodb+srv://azeam:oPEpuUWqt9DVLIHt@whisky.5bakc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const _PORT = process.env.WHISKYDB_PORT || 5005;

app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api", router);

mongoose.connect(
  _DB_CON,
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  () => {
    console.log("db connection established");
  }
);

app.listen(_PORT, () => {
  console.log("listening on port " + _PORT);
});
