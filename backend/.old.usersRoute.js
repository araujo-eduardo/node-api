//importanto a biblioteca fs (file system)
const fs = require("fs");

//desestruturação no fs, pegando o metódo join
const { join } = require("path");

//declarando uma cosntante que recebe o nosso banco de dados,
const filePath = join(__dirname, "users.json");

//função que retorna usuários
function getUsers() {
  const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : [];

  try {
    return JSON.parse(data);
  } catch (e) {
    throw e;
  }
}

function saveUsers(user) {
  const users = getUsers();
  //acrescentar o usuário que estamos recebendo
  users.push(user);

  //armazenando no banco
  fs.writeFileSync(filePath, JSON.stringify(users, null, "\t"));
}
function updateUsers(users) {
  //armazenando no banco
  fs.writeFileSync(filePath, JSON.stringify(users, null, "\t"));
}

function userExists(id) {
  const users = getUsers();
  var res = false;
  users.filter((user) => {
    if (user.id === id) {
      return (res = true);
    }
  });

  return res;
}

function userRouter(app) {
  app
    .route("/users/:id?")
    .get((req, res) => {
      try {
        const users = getUsers();
        if (users.length === 0) {
          return res.status(404).send("Dados não encontrados!");
        } else {
          return res.status(200).json(users);
        }
      } catch (e) {
        return res.status(500).json({
          fileName: e.fileName,
          lineNumber: e.lineNumber,
          message: e.message,
        });
      }
    })
    .post((req, res) => {
      const user = req.body;
      var name = user.name;
      var idade = user.idade;
      var id = user.id;

      if (name === "" || idade === "") {
        return res.status(400).send("Todos os campos são obrigatórios!");
      }

      if (!userExists(id)) {
        saveUsers(user);
        return res.status(201).send({
          message: "Usuário criado!",
          newUser: user,
        });
      } else {
        return res.status(400).send("Id já cadastrado!");
      }
    })
    .put((req, res) => {
      const users = getUsers();
      const id = req.params.id;
      var newUsers = users.map((user) => {
        if (user.id === id) {
          return {
            // ...user,
            // ...req.body,
            id: user.id,
            name: req.body.name,
            idade: req.body.idade,
          };
        }
        return user;
      });
      updateUsers(newUsers);

      return res
        .status(200)
        .send({ message: "Usuário atualizado!", newUsers: newUsers });
    })
    .delete((req, res) => {
      const users = getUsers();
      var newUsers = users.filter((user) => user.id !== req.params.id);

      updateUsers(newUsers);

      res
        .status(200)
        .send({ message: "Usuário removido!", newUsers: newUsers });
    });
}

module.exports = userRouter;
