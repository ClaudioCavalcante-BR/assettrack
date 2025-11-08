import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const Ctx = createContext(null);
export const useAssets = () => useContext(Ctx);

export default function AssetsProvider({ children }) {
  const [assets, setAssets] = useState(() => {
    const raw = localStorage.getItem("assettrack.assets");
    return raw ? JSON.parse(raw) : [
      { id: 1, 
        name: "AXOR 4440", 
        tag: "PAT-0001", 
        category: "Caminhão",
        location: "Matriz", 
        acquisitionDate: "2023-07-10", 
        acquisitionCost: 650000,
        lifecycleMonths: 36, 
        status: "ACTIVE"
      },

      { id: 2, 
        name: "AXOR 4444", 
        tag: "PAT-0002", 
        category: "Caminhão",
        location: "Filial2", 
        acquisitionDate: "2024-07-10", 
        acquisitionCost: 670000,
        lifecycleMonths: 36, 
        status: "ACTIVE"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("assettrack.assets", JSON.stringify(assets));
  }, [assets]);

  const createAsset = (data) => {
    const id = Math.max(0, ...assets.map(a => a.id)) + 1;
    setAssets(prev => [...prev, { id, ...data }]);
  };

  const updateAsset = (id, data) => {
    setAssets(prev => prev.map(a => (a.id === id ? { ...a, ...data } : a)));
  };

  const deleteAsset = (id) => {
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  return (
    <Ctx.Provider value={{ assets, createAsset, updateAsset, deleteAsset }}>
      {children}
    </Ctx.Provider>
  );
}
AssetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};