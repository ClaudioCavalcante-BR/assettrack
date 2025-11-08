import ClassClock from "../Demo/ClassClock.jsx";

export default function Header() {
  return (
    <div className="header-inner">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 25,
          flexWrap: "wrap",
        }}
      >
        <h3 style={{ 
          margin: 0 }}>
            AssetTrack • Gestão de Ativos
        </h3>
        <ClassClock label="Relógio --->: " />
      </div>
      <small className="muted">Projeto: AssetTrack</small>
    </div>
  );
}