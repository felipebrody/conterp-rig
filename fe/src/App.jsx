//React / Redux / Router
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";

//MUI
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

//Layout
import Layout from "./pages/Layout";

//Pages
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";
import Efficiencies from "./pages/Efficiencies";
import Rig from "./pages/Rig";
import Admin from "./pages/Admin";
import EfficiencyDetails from "./pages/EfficiencyDetails";
import Dashboard from "./pages/Dashboard";

//Hooks
import { useAuth } from "./hooks/useAuth";

//Toast
import ToastContainer from "./components/Toast/ToastContainer";

/*======================= IMPORT AREA *END* ==================================================*/

function App() {
  const mode = useSelector((state) => state.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const { auth, loading, isUserAdm } = useAuth();

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/login"
              element={auth ? <Navigate to="/user/home" /> : <Login />}
            />

            {/* Inicio do Layout */}
            <Route
              path="/user"
              element={auth ? <Layout /> : <Navigate to="/login" />}
            >
              {/* Inicio das rotas do Layout */}
              <Route path="/user/home" element={<Dashboard />} />
              <Route
                path="/user/admin"
                element={isUserAdm ? <Admin /> : <Navigate to="/user/home" />}
              />
              <Route path="/user/rig-form" element={<Rig />} />
              <Route
                path="/user/list-efficiencies"
                element={<Efficiencies />}
              />
              <Route
                path="/user/list-efficiencies/details/:id"
                element={<EfficiencyDetails />}
              />
              {/* Fim das rotas do Layout */}
            </Route>
            {/* Fim do Layout */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
