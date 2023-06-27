const express = require("express");
const routes = express.Router();

const UsersController = require("./controllers/UsersController");

routes.get("/");

routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.read);

routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.delete);

routes.get("*", function (req, res) {
  res.status(404).send("Página não encontrada!");
});

module.exports = routes;
