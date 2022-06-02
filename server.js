const express = require("express");
const usersRoute = require("./usersRoute");
const app = express();
const port = 3000;

usersRoute(app);

app.get("/", (req, res) => {
  res.send("Olá, sou uma APIREST em node!");
});

app.listen(port, () => {
  console.log(`APIREST Rodando na porta ${port}!`);
});
