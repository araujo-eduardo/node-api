const express = require("express");
const routes = express.Router();

const UsersController = require("./controllers/UsersController");

routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.read);

routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.delete);
routes.get("/users.html", UsersController.sendPage);

module.exports = routes;
