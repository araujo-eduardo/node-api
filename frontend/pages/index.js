import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>API Node</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <nav>
          <ul>
            <li>
              <a className="title" href="/users/list">
                Usuários
              </a>
            </li>
          </ul>
        </nav>
      </main>
      <footer>
        <p>API Desenvolvida na cadeira de Programação WEB</p>
      </footer>
    </div>
  );
}
