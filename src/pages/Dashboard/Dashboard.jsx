import Card from "../../components/UI/Card.jsx";
import { useAssets } from "../../context/AssetsContext.jsx";

export default function Dashboard() {
  const { assets } = useAssets();

  // 🔹 Cálculos dos indicadores
  const total = assets.length;
  const emManutencao = assets.filter(a => a.status === "MAINTENANCE").length;
  const baixados = assets.filter(a => a.status === "DISPOSED").length;
  const valorTotal = assets.reduce(
    (sum, a) => sum + (Number(a.acquisitionCost) || 0),
    0
  );

  const moeda = (n) =>
    (Number(n) || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // 🔹 KPIs mapeados (sem ícones)
  const kpis = [
    { title: "Ativos Cadastrados", value: total },
    { title: "Em Manutenção", value: emManutencao },
    { title: "Baixados", value: baixados },
    { title: "Valor Total do Ativo", value: moeda(valorTotal) },
  ];

  return (
    <>
      <h2 style={{ marginTop: 0 }}>Visão Geral dos Ativos</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "12px",
        }}
      >
        {kpis.map((k) => (
          <Card key={k.title} title={k.title}>
            <div
              className="kpi"
              style={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                marginTop: "6px",
                textAlign: "center",
              }}
            >
              {k.value}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
