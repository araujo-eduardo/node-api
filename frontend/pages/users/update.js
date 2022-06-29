import api from "../../services/api";
import { useState, useEffect } from "react";

export default function UpdateUser() {
  const [user, setUser] = useState({ name: "", idade: 0 });
  const [users, setUsers] = useState();
  const [userId, setUserId] = useState();
  const [loadUsers, setLoadUsers] = useState(true);

  function onChange(e) {
    e.preventDefault();
    const value = e.target.value;

    if (e.target.name === "selectedUser") {
      setUserId(parseInt(value));
    }

    if (e.target.name === "name") {
      setUser({ name: value, idade: user.idade });
    }

    if (e.target.name === "idade") {
      setUser({ name: user.name, idade: parseInt(value) });
    }
  }

  async function getUsers() {
    api.get("/users").then((res) => {
      const { data } = res;
      setUsers(data.users);
    });
  }

  async function updateUser() {
    api
      .put(`/users/${userId}`, user)
      .then(() => {
        alert("Usuário atualizado!");
        // setLoadUsers(true);
        window.location = "/users/list";
      })
      .catch((e) => {
        alert(`Erro: ${e}`);
      });
  }

  useEffect(() => {
    getUsers();
    setLoadUsers(false);
  }, [loadUsers]);

  console.log(user);

  return (
    <div>
      <h1>Criar Usuário</h1>

      <form onChange={(e) => onChange(e)}>
        <h1>Selecione um usuário para atualizar</h1>
        <select name="selectedUser" defaultValue="DEFAULT">
          <option value="DEFAULT" disabled>
            Selecione um usuário
          </option>
          {users?.map((user) => {
            return <option value={user.id}>{user.name}</option>;
          })}
        </select>
        <h1>Insira os dados para atualizar</h1>
        <label htmlFor="name">Nome</label>
        <input type="text" name="name"></input>

        <label htmlFor="name">Idade</label>
        <input type="number" name="idade"></input>
      </form>
      <br />
      <br />
      <br />
      <button onClick={() => updateUser()}>Atualizar usuário</button>

      <footer>
        <br />
        <br />
        <a href="/users/list">Voltar para lista de usuários</a>
      </footer>
    </div>
  );
}
