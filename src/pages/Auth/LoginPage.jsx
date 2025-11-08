import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate(from, { replace: true });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.card} role="dialog" aria-labelledby="login-title">
        <div className={styles.header}>
          <div className={styles.logo} aria-hidden>ATIVOS</div>
          <h1 id="login-title" className={styles.title}>Entrar</h1>
          <p className={styles.subtitle}>Acesse a área de gestão de ativos - Seja Bem Vindo</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={handleLogin}>
            Entrar agora
          </button>
        </div>

        <p className={styles.hint}>
          Dica: este ambiente usa login simplificado apenas para a rota privada.
        </p>
      </div>
    </div>
  );
}
