import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaTruck, FaHome, FaMapMarkerAlt } from "react-icons/fa";

const links = [

  { to: "/", label: 
    <><FaHome /> 
    Dashboard
    </> 
  },
  { to: "/assets", label: 
    <><FaTruck /> 
    Cadastro de Ativos
    </> 
  },
  { to: "/ceps", label: 
    <><FaMapMarkerAlt /> 
    Consultar por CEPs
    </> 
  },
];

function NavList({ children }) {
  return <div>{children}</div>;
}
  NavList.propTypes = {
    children: PropTypes.node,
};

function NavItem({ to, children }) {
  const nav = useNavigate();
  return (
    <button onClick={() => nav(to)} className="nav-btn">
      {children}
    </button>
  );
}
  NavItem.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default function Sidebar() {
  const { pathname } = useLocation();
  const [isBlur, setIsBlur] = useState(() => !document.body.classList.contains("no-blur"));

  const toggleBackground = () => {
    const next = !isBlur;
    document.body.classList.toggle("no-blur", !next);
    setIsBlur(next);
  };

  return (
    <div
      className="sidebar panel"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", 
        height: "100%",
      }}
    >
      <div>
        <h4 style={{ marginTop: 0 }}>Navegação</h4>

        <NavList>
          {links.map((l) => (
            <NavItem key={l.to} to={l.to}>
              <span className={pathname === l.to ? "active" : ""}>{l.label}</span>
            </NavItem>
          ))}

        </NavList>
        <p className="muted" style={{ marginTop: 10, fontSize: 10, opacity:0.4 }}>
          {pathname === "/" ? "Esta em Dashboard" 
          : pathname === "/assets" ? "Esta em Ativos" 
          : pathname === "/ceps" ? "Está em CEPs"
          : ""}
        </p>
      </div>
      <div>
        <hr
          style={{
            margin: "16px 0",
            opacity: 0.15,
            borderColor: "var(--border)",
          }}
        />
        <button className="toggle-btn" onClick={toggleBackground}>
          {isBlur ? "Imagem translúcida" : "Imagem nítida"}
        </button>
      </div>
    </div>
  );
}