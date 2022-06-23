const { Sequelize, DataTypes } = require("sequelize");

const database = "api";
const username = "root";
const password = "";

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mariadb",
});

async function connectDb() {
  try {
    await sequelize.authenticate();
    console.log("Conexão estabelecida com o banco de dados!");
  } catch (error) {
    console.error("Erro na conexão: ", error);
  }
}

connectDb();

const Users = sequelize.define(
  "Users",
  {
    name: { type: DataTypes.STRING },
    idade: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
  }
);

// console.log(Users === sequelize.models.Users); // true

function userRouter(app) {
  app
    .route("/users/:id?")
    .get(async (req, res) => {
      try {
        const id = req.params.id;
        var users;
        if (!!id) {
          users = await Users.findByPk(parseInt(id));
        } else {
          users = await Users.findAll();
        }

        return res.status(200).send({ users: users });
      } catch (e) {
        return res.status(500).json({
          error: e,
          message: e.message,
        });
      }
    })
    .post(async (req, res) => {
      var name = req.body.name;
      var idade = req.body.idade;

      const newUser = await Users.create({
        name: name,
        idade: idade,
      });

      res.status(201).send({ message: "Usuário criado!", newUser: newUser });
    })
    .put(async (req, res) => {
      const id = req.params.id;
      const name = req.body.name;
      const idade = req.body.idade;

      await Users.update({ name: name, idade: idade }, { where: { id: id } });

      const newUsers = Users.findAll();

      return res
        .status(200)
        .send({ message: "Usuário atualizado!", newUsers: newUsers });
    })
    .delete(async (req, res) => {
      const id = parseInt(req.params.id);

      await Users.destroy({ where: { id: id } });

      res.status(200).send({ message: "Usuário removido!" });
    });
}

module.exports = userRouter;
