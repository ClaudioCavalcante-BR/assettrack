import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AppLayout({ children }) {
  const { isLogged } = useAuth();

  //renderiza somente o conteúdo da tela de login
  if (!isLogged) {
    return (
      <section className="main">
        <main className="panel content">
          {children}
        </main>
      </section>
    );
  }

  // Após login layout completo
  return (
    <div className="layout">
      <aside className="panel sidebar">
        <Sidebar />
      </aside>

      <section className="main">
        <header className="panel header">
          <Header />
        </header>

        <main className="panel content">
          {children}
        </main>

        <Footer />
      </section>
    </div>
  );
}
