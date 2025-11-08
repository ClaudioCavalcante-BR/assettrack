import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import AssetList from "../forms/AssetList.jsx";
import LoginPage from "../pages/Auth/LoginPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import CepSearch from "../pages/CepSearch.jsx";

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/assets"
        element={
          <PrivateRoute>
            <AssetList />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/ceps" element={<CepSearch />} />
    </Routes>
  );
}
