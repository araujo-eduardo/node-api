const express = require("express");
const db = require("./config/database");
const app = express();
const cors = require("cors");
const router = require("./routes");
const path = require("path");
const port = 3003;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.sync();

app.use(router);

app.get("/", (req, res) => {
  // res.send("<h1>Olá, sou uma APIREST em node!</h1>");
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.listen(port, () => {
  console.log(`APIREST Rodando na porta ${port}!`);
});
