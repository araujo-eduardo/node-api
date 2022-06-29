import api from "../../services/api";
import { useState } from "react";

export default function CreateUser() {
  const [user, setUser] = useState({ name: "", idade: 0 });

  function onChange(e) {
    e.preventDefault();
    const value = e.target.value;

    if (e.target.name === "name") {
      setUser({ name: value, idade: user.idade });
    }

    if (e.target.name === "idade") {
      setUser({ name: user.name, idade: parseInt(value) });
    }
  }

  async function createUser() {
    api
      .post("/users", user)
      .then(() => {
        alert("Usuário criado!");
        window.location = "/users/list";
      })
      .catch((e) => {
        alert(`Erro: ${e}`);
      });
  }

  console.log(user);

  return (
    <div>
      <h1>Criar Usuário</h1>

      <form onChange={(e) => onChange(e)}>
        <label htmlFor="name">Nome</label>
        <input type="text" name="name"></input>

        <label htmlFor="name">Idade</label>
        <input type="number" name="idade"></input>
      </form>

      <button onClick={() => createUser()}>Criar usuário</button>

      <footer>
        <a href="/users/list">Voltar para lista de usuários</a>
      </footer>
    </div>
  );
}
