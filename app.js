const express = require("express");
require('dotenv').config()
const app = express();
const path = require("path");
const PORT = process.env.PORT;
const index = require("./routes/index");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

function myMiddleware(req, res, next) {
  console.log(req.method, req.url);
  next();
}
app.use(myMiddleware);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", index);
app.get("/new", index);
app.post("/new", index);
app.get("/messages/:messageid", index);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));