import { useMemo, useState, useCallback, useEffect } from "react";
import { DataGrid, GridRowModes } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, setItems, clearFilter } from "../store/index.js";
import { useAssets } from "../context/AssetsContext.jsx";
import AssetForm from "./AssetForm.jsx";
import AssetItem from "./AssetItem.jsx";
import ConfirmDialog from "../components/UI/ConfirmDialog.jsx";
import { useQuery } from "@tanstack/react-query";
import { FaHandPointer } from "react-icons/fa";

export default function AssetList() {
  const { assets, createAsset, updateAsset, deleteAsset } = useAssets();

  const {
    data: assetsData = Array.isArray(assets) ? assets : [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => (Array.isArray(assets) ? assets : []),
    staleTime: 60_000,
  });

  const dispatch = useDispatch();
  const reduxFilter = useSelector((s) => s?.assets?.filter) ?? "";
  const [q, setQ] = useState("");
  const [toDelete, setToDelete] = useState(null);
  const [useNativeTable, setUseNativeTable] = useState(false);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    dispatch(setItems(assetsData));
  }, [assetsData, dispatch]);

  useEffect(() => {
    if ((reduxFilter || "") !== (q || "")) setQ(reduxFilter || "");
  }, [reduxFilter, q]);

  const filtered = useMemo(() => {
    const txt = (reduxFilter || q || "").toLowerCase();
    const list = Array.isArray(assetsData) ? assetsData : [];
    return list.filter((a) =>
      `${a?.name ?? ""} ${a?.tag ?? ""} ${a?.category ?? ""} ${a?.location ?? ""} ${a?.status ?? ""}`
        .toLowerCase()
        .includes(txt)
    );
  }, [assetsData, reduxFilter, q]);

  const rows = useMemo(
    () =>
      filtered.map((a, i) => ({
        id: a?.id ?? i,
        ...a,
        acquisitionCost: Number(a?.acquisitionCost ?? 0),
      })),
    [filtered]
  );

  const processRowUpdate = useCallback(
    (newRow, oldRow) => {
      const payload = {
        ...oldRow,
        ...newRow,
        acquisitionCost:
          newRow?.acquisitionCost === "" || newRow?.acquisitionCost == null
            ? ""
            : Number(newRow.acquisitionCost),
      };
      updateAsset(payload);
      return payload;
    },
    [updateAsset]
  );

  const handleEditClick = (id) => () => {
    setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.Edit } }));
  };
  const handleSaveClick = (id) => () => {
    setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
  };
  const handleCancelClick = (id) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
  };

  // ======= COLUNAS (usar flex para não estourar a largura) =======
  const columns = [
    { field: "tag", headerName: "TAG", flex: 0.9, minWidth: 120, editable: true },
    { field: "name", headerName: "Nome", flex: 1.4, minWidth: 180, editable: true },
    { field: "category", headerName: "Categoria", flex: 1, minWidth: 140, editable: true },
    { field: "location", headerName: "Local", flex: 1.3, minWidth: 220, editable: true },
    { field: "acquisitionCost", headerName: "Custo", type: "number", flex: 0.8, minWidth: 130, editable: true, align: "right", headerAlign: "right", cellClassName: "dg-cost",
      valueFormatter: ({ value }) =>
        value === "" || value == null
          ? ""
          : Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      minWidth: 120,
      align: "center",        
      headerAlign: "center",  
      cellClassName: "dg-status",
      type: "singleSelect",
      valueOptions: [
        { value: "ACTIVE", label: "Ativo" },
        { value: "MAINTENANCE", label: "Manutenção" },
        { value: "DISPOSED", label: "Baixado" },
      ],
      renderCell: (params) => {
        const st = params.value || "ACTIVE";
        const label = st === "ACTIVE" ? "Ativo" : st === "MAINTENANCE" ? "Manutenção" : "Baixado";
        const variant = st === "ACTIVE" ? "success" : st === "MAINTENANCE" ? "warn" : "danger";
        return <button type="button" className={`panel pill ${variant}`}>{label}</button>;
      },
    },
    {
      field: "actions",
      headerName: "Ações de Editar ou Excluir",
      sortable: false,
      filterable: false,
      align: "center",       
      headerAlign: "center",
      flex: 1.4,
      minWidth: 340,
      cellClassName: "dg-actions",
      renderCell: (params) => (
        <div
          className="dg-actions-wrap"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            alignItems: "center",
            justifyContent: "center", 
            width: "100%",           
            textAlign: "center",
      }}
    >
      <button className="panel" onClick={handleEditClick(params.row.id)}>Alterar</button>
      <button className="panel danger" onClick={() => setToDelete(params.row.id)}>Excluir</button>
      <button className="panel" onClick={handleSaveClick(params.row.id)}>Salvar</button>
      <button className="panel" onClick={handleCancelClick(params.row.id)}>Cancelar</button>
    </div>
  ),
},
  ];

  return (
    <>
      <h2 style={{ marginTop: 0 }}>
        Ativos {isFetching && <small className="muted">atualizando…</small>}
      </h2>

      {isLoading && <div className="panel" style={{ marginBottom: 12 }}>Carregando…</div>}

      {error && (
        <div className="panel danger" style={{ marginBottom: 12 }}>
          Falha ao consultar <code>/api/assets</code>. Exibindo dados locais (cache/Context).
          <button className="panel" style={{ marginLeft: 8 }} onClick={() => refetch()}>
            Tentar novamente
          </button>
        </div>
      )}

      <div className="grid2" style={{ marginBottom: 16 }}>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar por nome, TAG, categoria, local..."
            value={reduxFilter || q}
            onChange={(e) => {
              const v = e.target.value;
              setQ(v);
              dispatch(setFilter(v));
            }}
          />
          {(reduxFilter || q) && (
            <button
              className="clear-btn"
              onClick={() => {
                setQ("");
                dispatch(clearFilter());
              }}
              aria-label="Limpar"
              type="button"
              title="Limpar"
            >
              ✖
            </button>
          )}
        </div>

        <div className="muted" style={{ display: "grid", alignContent: "center" }}>
          Total: {filtered.length}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button type="button" className="panel" onClick={() => setUseNativeTable(false)} aria-pressed={!useNativeTable}>
          Tabela DataGrid
        </button>
        <button type="button" className="panel" onClick={() => setUseNativeTable(true)} aria-pressed={useNativeTable}>
          Tabela HTML
        </button>
      </div>

      <AssetForm onCreate={createAsset} />
      
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <button
          type="button"
          className="panel"
          onClick={() => refetch()}
          disabled={isFetching}
          title="Atualizar dados da tabela"
          style={{ display: "inline-flex", alignItems: "center", gap: 8 }} 
        >
          <FaHandPointer aria-hidden="true" />
          {isFetching ? "Atualizando…" : "Clique AQUI para Atualizar a Tabela"}
        </button>
      </div>

{!useNativeTable && (
  <div className="datagrid-box" style={{ marginTop: 16 }}>
   <DataGrid
      rows={rows}
      columns={columns}
      density="compact"
      autoHeight
      rowHeight={64}
      pageSizeOptions={[5, 10, 20]}
      initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      disableRowSelectionOnClick
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={setRowModesModel}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={(e) => {
        console.error(e);
        alert("Erro ao salvar edição.");
      }}
      hideFooterSelectedRowCount
      disableColumnMenu
      headerHeight={44}
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
          color: "#141212ff",
          fontWeight: 600,
        },
        "& .MuiDataGrid-cell": {
          color: "#fff",
          borderBottom: "1px solid var(--border)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },

    
        "& .dg-status": { justifyContent: "center" },

        // centralização da coluna AÇÕES
        "& .dg-actions": { justifyContent: "center", textAlign: "center" },
        "& .dg-actions .dg-actions-wrap": {
          width: "100%",
          justifyContent: "center",
        },
        "& .dg-actions .dg-actions-wrap button": {
          padding: "4px 8px",
          fontSize: "0.9rem",
        },
        "& .dg-cost .dg-cost-txt": {
          display: "inline-block",
          width: "100%",
          textAlign: "right",
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "transparent !important",
        },
        "& .MuiDataGrid-row.Mui-hovered": {
          backgroundColor: "transparent !important",
        },
        "& .MuiDataGrid-row.Mui-selected": {
          backgroundColor: "transparent !important",
        },
        "& .MuiDataGrid-row.Mui-selected:hover": {
          backgroundColor: "transparent !important",
        },    
      }}
    />
  </div>
)}
      {useNativeTable && (
        <div className="panel table-scroll" style={{ marginTop: 16, overflow: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>TAG</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Local</th>
                <th>Custo</th>
                <th>Status</th>
                <th>Ações de Editar ou Excluir</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="muted">Nenhum ativo encontrado…</td>
                </tr>
              )}
              {filtered.map((a) => (
                <AssetItem
                  key={a?.id ?? `${a?.tag}-${a?.name}`}
                  asset={a}
                  onUpdate={updateAsset}
                  onDelete={(id) => setToDelete(id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={toDelete != null}
        text="Confirma excluir este ativo?"
        onConfirm={() => {
          if (toDelete == null) return;
          deleteAsset(toDelete);
          setToDelete(null);
        }}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
