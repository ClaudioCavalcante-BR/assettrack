import { useEffect } from "react";
import styles from "./Landing.module.css";
import { FaCheck } from "react-icons/fa";

export default function Landing({ onEnter }) {
  useEffect(() => {
    const img = new Image();
    img.src = "/landing.jpg"; // public/
  }, []);

  return (
    <div className={styles.wrap} style={{ backgroundImage: `url(/landing.jpg)` }}>
      <div className={styles.overlay} />
      <div className={styles.card}>
        <h1>AssetTrack</h1>
        <p className={styles.subtitle}>Painel de entrada</p>

        <div className={styles.text}>
          <p>
            O <strong>AssetTrack</strong> é um projeto focado em
            <em> cadastro, organização e rastreabilidade de ativos</em> no contexto
            logístico e operacional. Nosso objetivo é oferecer uma experiência
            simples, clara e eficiente para o time acompanhar o ciclo de vida dos ativos,
            do registro à consulta e controle.
          </p>
          <p>
            Esta aplicação prioriza <strong>usabilidade</strong>, <strong>desempenho</strong> e
            <strong> transparência</strong> das informações. Os dados são apresentados
            de forma objetiva, com navegação intuitiva e componentes responsivos,
            garantindo acesso em diferentes dispositivos.
          </p>
          <p>
            <strong>Considerações:</strong> as telas foram projetadas com foco em leitura,
            consistência visual e acessibilidade. O fluxo de entrada reduz a curva de
            aprendizado, preparando o usuário para uma navegação direta ao conteúdo principal.
          </p>
        </div>

        <ul className={styles.badges}>
            <li><FaCheck className={styles.badgeIcon}/> 
            Cadastro de ativos
            </li>
            <li><FaCheck className={styles.badgeIcon}/> 
            Lista e busca rápida
            </li>
            <li><FaCheck className={styles.badgeIcon}/> 
            Design responsivo
            </li>
        </ul>

        <button className={styles.button} onClick={onEnter}>
          Acessar o projeto
        </button>

        <p className={styles.note}>
          *Para reexibir este painel, limpe o <code>localStorage</code>, caso necessario.
        </p>
      </div>
    </div>
  );
}
