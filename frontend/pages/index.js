import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <nav>
          <ul>
            <li>
              <Link href="/users">
                <a>Usuários</a>
              </Link>
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
