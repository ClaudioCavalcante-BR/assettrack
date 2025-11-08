import { useState } from "react";
import AppLayout from "./components/Layout/AppLayout.jsx";
import Router from "./routes/Router.jsx";
import Landing from "./components/Landing/Landing.jsx";

export default function App() {
  // Sempre inicia mostrando a Landing a cada load/refresh
  const [showLanding, setShowLanding] = useState(true);

  const handleEnter = () => {
    // Esconde somente nesta sessão (volta ao recarregar a página)
    setShowLanding(false);
  };

  return (
    <div className="app__wrap">
      {showLanding && <Landing onEnter={handleEnter} />}
      <AppLayout>
        <Router />
      </AppLayout>
    </div>
  );
}
