import { useState } from "react";
import StatusBadge from "../components/UI/StatusBadge.jsx";
import PropTypes from "prop-types";


export default function AssetItem({ asset, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(asset);

  const handleChange = ({ target }) =>
    setForm(prev => ({ ...prev, [target.name]: target.value }));

  const costValue = asset.acquisitionCost ?? asset.cost ?? 0;
  const formattedCost = `R$ ${Number(costValue || 0).toLocaleString("pt-BR")}`;

  const save = () => {
    const payload = {
      ...form,
      acquisitionCost: Number(form.acquisitionCost ?? form.cost ?? 0),
    };
    onUpdate(asset.id, payload);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <tr>
        <td>{asset.tag}</td>
        <td>{asset.name}</td>
        <td>{asset.category}</td>
        <td>{asset.location}</td>
        <td>{formattedCost}</td>
        <td>
          <span className={`status ${asset.status?.toLowerCase()}`}>
            {asset.status === "ACTIVE" ? "Ativo"
              : asset.status === "MAINTENANCE" ? "Em Manutenção"
              : "Baixado"}
          </span>
        </td>
        <td className="actions">
          <button className="panel" onClick={() => setIsEditing(true)}>Alterar</button>
          <button className="panel danger" onClick={() => onDelete(asset.id)}>Excluir</button>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td><input name="tag" value={form.tag || ""} onChange={handleChange} /></td>
      <td><input name="name" value={form.name || ""} onChange={handleChange} /></td>
      <td><input name="category" value={form.category || ""} onChange={handleChange} /></td>
      <td><input name="location" value={form.location || ""} onChange={handleChange} /></td>
      <td>
        <input
          name="acquisitionCost"
          type="number"
          value={form.acquisitionCost ?? form.cost ?? 0}
          onChange={handleChange}
        />
      </td>
      <td>
        <select name="status" value={form.status || "ACTIVE"} onChange={handleChange}>
          <option value="ACTIVE">Ativo</option>
          <option value="MAINTENANCE">Manutenção</option>
          <option value="DISPOSED">Baixado</option>
        </select>
      </td>
      <td className="actions">
        <button className="panel" onClick={save} style={{ borderColor: "var(--accent)" }}>Salvar</button>
        <button className="panel" onClick={() => setIsEditing(false)}>Cancelar</button>
      </td>
    </tr>
  );
}

AssetItem.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    category: PropTypes.string,
    location: PropTypes.string,
    acquisitionDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    acquisitionCost: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    cost: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    lifecycleMonths: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    status: PropTypes.oneOf(["ACTIVE", "MAINTENANCE", "DISPOSED"]).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
