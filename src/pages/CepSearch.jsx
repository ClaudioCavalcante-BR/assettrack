import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import { fetchCepsByAddress } from "../services/ViaCepService.js";

const UFS = [
  "AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT",
  "PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"
];

export default function CepSearch() {
  const [uf, setUf] = useState("SP");
  const [cidade, setCidade] = useState("");
  const [logradouro, setLogradouro] = useState("");

  const enabled = useMemo(
    () => uf && cidade.trim().length >= 2 && logradouro.trim().length >= 3,
    [uf, cidade, logradouro]
  );

  const { data = [], isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["viaCep", uf, cidade.trim(), logradouro.trim()],
    queryFn: () => fetchCepsByAddress(uf, cidade, logradouro),
    enabled: false,       
    staleTime: 60_000,
  });

  const columns = [
    { field: "cep", headerName: "CEP", minWidth: 110 },
    { field: "logradouro", headerName: "Logradouro", flex: 1, minWidth: 220 },
    { field: "bairro", headerName: "Bairro", flex: 1, minWidth: 160 },
    { field: "localidade", headerName: "Cidade", minWidth: 160 },
    { field: "uf", headerName: "UF", minWidth: 70 },
    { field: "ibge", headerName: "Codigo IBGE", minWidth: 110 },
    { field: "ddd", headerName: "DDD", minWidth: 90 },
  ];

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (enabled) await refetch();
  };

  return (
    <div className="panel" style={{ padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Consulta de CEPs por Endereço</h2>
      <form className="grid2" onSubmit={handleBuscar} style={{ gap: 12, marginBottom: 12 }}>
        <div>
          <label className="muted">UF</label>
          <select value={uf} onChange={(e) => setUf(e.target.value)}>
            {UFS.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        <div>
          <label className="muted">Cidade</label>
          <input
            type="text"
            placeholder="Ex.: São Paulo"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label className="muted">Logradouro (prefixo)  </label>
          <input
            type="text"
            placeholder="Ex.: Paulista"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />
        </div>

        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 8 }}>
          <button type="submit" className="panel" disabled={!enabled || isFetching}>
            {isFetching ? "Buscando..." : "Buscar CEPs"}
          </button>
          <span className="muted">
            Informe UF + cidade e pelo menos 3 letras do logradouro.
          </span>
        </div>
      </form>

      {isLoading && <div className="muted">Carregando…</div>}
      {error && <div className="panel danger">Erro: {String(error.message || error)}</div>}

      <div style={{ width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 20, 30]}
          initialState={{ 
            pagination: { paginationModel: { pageSize: 10 } } }}
          density="compact"
          disableRowSelectionOnClick

          localeText={{
            noRowsLabel: "Sem resultados",
            noResultsOverlayLabel: "Nenhum resultado encontrado",
          }}    
          
          sx={{
            color: "#fff",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            background: "var(--panel, #0b1026)",

            "& .MuiDataGrid-columnHeaders": {
              background: "#0a1236ff",
              borderBottom: "1px solid var(--border)",
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#130634ff",
              fontWeight: 600,
            },

            "& .MuiDataGrid-cell": {
              color: "#fff",
              borderBottom: "1px solid var(--border)",
              overflow: "visible",
            },
            "& .MuiDataGrid-footerContainer": {
              background: "rgba(0,0,0,0.35)",
              borderTop: "1px solid var(--border)",
            },
            "& .MuiTablePagination-toolbar, & .MuiTablePagination-root, \
              & .MuiTablePagination-displayedRows, & .MuiTablePagination-selectLabel": {
              color: "#fff",
            },
            "& .MuiSvgIcon-root": { color: "#fff" },    
            "& .MuiInputBase-input": { color: "#fff" },
          }}

        />
      </div>
    </div>
  );
}
