const { models } = require("../config/database");
const User = models.Users;
const path = require("path");

class UsersController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).send({ users: users });
    } catch (e) {
      return res.status(500).json({
        error: e,
        message: e.message,
      });
    }
  }

  async read(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(parseInt(id));
      return res.status(200).send({ user: user });
    } catch (e) {
      return res.status(500).json({
        error: e,
        message: e.message,
      });
    }
  }

  async create(req, res) {
    try {
      var name = req.body.name;
      var idade = req.body.idade;
      const newUser = await User.create({
        name: name,
        idade: idade,
      });
      res.status(201).send({ message: "Usuário criado!", newUser: newUser });
    } catch (e) {
      return res.status(500).json({
        error: e,
        message: e.message,
      });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const name = req.body.name;
      const idade = req.body.idade;
      const user = await User.update(
        { name: name, idade: idade },
        { where: { id: id } }
      );
      console.log(...user);
      if (user[0] === 1) {
        return res.status(200).send({ message: "Usuário atualizado!" });
      } else {
        return res.status(200).send({ message: "Nenhum dado alterado!" });
      }
    } catch (e) {
      return res.status(500).json({
        error: e,
        message: e.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      const user = await User.destroy({ where: { id: id } });
      console.log(user);
      if (user === 1) {
        return res.status(200).send({ message: "Usuário removido!" });
      } else {
        return res.status(200).send({ message: "Nenhum usuário removido!" });
      }
    } catch (e) {
      return res.status(500).json({
        error: e,
        message: e.message,
      });
    }
  }
}

module.exports = new UsersController();
