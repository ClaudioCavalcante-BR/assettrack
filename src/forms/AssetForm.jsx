import { useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { fetchCep } from "../services/ViaCepService";

export default function AssetForm({ onCreate }) {
  const [form, setForm] = useState({
    name: "",
    tag: "",
    category: "",
    location: "",
    acquisitionDate: "",
    acquisitionCost: "",
    lifecycleMonths: 36,
    status: "ACTIVE",
    cep: "",
  });

  // ----------------  React Query --- para CEP (consulta manual via refetch) ---------------- 
  const {
    error: cepRqError,
    isFetching: cepLoading,
    refetch: refetchCep,
  } = useQuery({
    queryKey: ["cep", form.cep],
    queryFn: () => fetchCep(form.cep),
    enabled: false,            
    staleTime: 5 * 60_000,    
    retry: 2,
  });

  // ---------------- Handlers -------------------------------- ---------------- 
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cep") {
      const onlyDigits = value.replace(/\D/g, "");
      setForm({ ...form, cep: onlyDigits });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      acquisitionCost:
        form.acquisitionCost === "" ? "" : Number(form.acquisitionCost),
      lifecycleMonths:
        form.lifecycleMonths === "" ? "" : Number(form.lifecycleMonths),
    };

    onCreate(payload);

    // reset
    setForm({
      name: "",
      tag: "",
      category: "",
      location: "",
      acquisitionDate: "",
      acquisitionCost: "",
      lifecycleMonths: 36,
      status: "ACTIVE",
      cep: "",
    });
  };

  // ---------------- Dispara a consulta do CEP e preenche "location" ---------------- 
  const consultarCep = async () => {
    const cepOk = /^\d{8}$/.test((form.cep || "").replace(/\D/g, ""));
    if (!cepOk) 
      return;

    const r = await refetchCep();
    if (r.data) {
      const end = `${r.data.logradouro || ""}, ${r.data.localidade} - ${r.data.uf}`.trim();
      setForm((prev) => ({ ...prev, location: end }));
    }
  };

  const onBlurCep = () => consultarCep();

  // ---------------- Renderiza ----------------
  return (
    <form onSubmit={handleSubmit} className="grid2 panel" style={{ marginTop: 16 }}>
      <input
        name="name"
        placeholder="Nome do Ativo"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="tag"
        placeholder="TAG (patrimônio)"
        value={form.tag}
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Categoria"
        value={form.category}
        onChange={handleChange}
      />

      <div className="field" style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          name="cep"
          placeholder="CEP (8 dígitos)"
          value={form.cep}
          onChange={handleChange}
          onBlur={onBlurCep}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              consultarCep();
            }
          }}
          inputMode="numeric"
          aria-invalid={!!cepRqError}
          aria-describedby="cep-help cep-erro"
          style={{ flex: 1 }}
          disabled={cepLoading}
        />
        <button
          type="button"
          className="panel"
          onClick={consultarCep}
          disabled={cepLoading}
        >
          {cepLoading ? "Buscando..." : "Buscar CEP"}
        </button>
      </div>
      <small id="cep-help">Dica: digite apenas números e CEPs existentes (ex.: 30140071).</small>
      {cepLoading && <small style={{ display: "block" }}>Consultando CEP…</small>}
      {cepRqError && (
        <small id="cep-erro" style={{ color: "var(--danger)", display: "block" }}>
          {cepRqError.message}
        </small>
      )}

      <input
        name="location"
        placeholder="Localização"
        value={form.location}
        onChange={handleChange}
      />

      <input
        name="acquisitionDate"
        type="date"
        value={form.acquisitionDate}
        onChange={handleChange}
      />

      <input
        name="acquisitionCost"
        placeholder="Custo de Aquisição"
        value={form.acquisitionCost}
        onChange={handleChange}
        inputMode="decimal"
      />

      <input
        name="lifecycleMonths"
        placeholder="Vida útil (meses)"
        value={form.lifecycleMonths}
        onChange={handleChange}
        inputMode="numeric"
      />

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="ACTIVE">Ativo</option>
        <option value="MAINTENANCE">Manutenção</option>
        <option value="DISPOSED">Baixado</option>
      </select>
      <button type="submit" className="panel btn-add" >Adicionar</button>
    </form>
  );
}

AssetForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
