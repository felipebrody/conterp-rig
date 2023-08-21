//React / Redux / Router
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import {useMemo} from "react";
import {useSelector} from "react-redux";

//React Query
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

//MUI
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {themeSettings} from "./theme";

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
import {useAuth} from "./hooks/useAuth";

//Toast
import ToastContainer from "./components/Toast/ToastContainer";
import {DatesProvider} from "./contexts/DatesContext/DatesContext";
import {DashboardProvider} from "./pages/Dashboard/DashboardContext/index";

/*======================= IMPORT AREA *END* ==================================================*/

//React Query

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

//

function App() {
  const mode = useSelector((state) => state.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const {auth, loading, isUserAdm} = useAuth();

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <DatesProvider>
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
                  <Route path="/user/home" element={<UserHome />} />
                  <Route
                    path="/user/admin"
                    element={
                      isUserAdm ? <Admin /> : <Navigate to="/user/home" />
                    }
                  />
                  <Route
                    path="/user/rig-form"
                    element={
                      !isUserAdm ? (
                        <Rig />
                      ) : (
                        <Navigate to="/user/list-efficiencies" />
                      )
                    }
                  />
                  <Route
                    path="/user/rig-form/:id"
                    element={
                      !isUserAdm ? (
                        <Rig />
                      ) : (
                        <Navigate to="/user/list-efficiencies" />
                      )
                    }
                  />
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
            </DatesProvider>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
