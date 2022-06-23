const express = require("express");
const usersRoute = require("./usersRoute");
const usersRouteDb = require("./usersRouteDb");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

usersRouteDb(app);
//usersRoute(app);

app.get("/", (req, res) => {
  res.send("Olá, sou uma APIREST em node!");
});

app.listen(port, () => {
  console.log(`APIREST Rodando na porta ${port}!`);
});
