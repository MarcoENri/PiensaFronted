import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { SensorDataList } from "./pages/sensor-data/SensorDataList";
import SensorDataShow from "./pages/sensor-data/SensorDataShow"; // Importación corregida

import { ForgotPassword } from "./pages/forgotPassword";
import { Register } from "./pages/register";

// Importa el LoginPage
import { LoginPage } from "./pages/LoginPage";

// Importa el ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute"; // Asegúrate de que el archivo esté correctamente importado

// Importa el AuthProvider
import { AuthProvider, useAuth } from "./context/AuthContext";  // Asegúrate de importar el AuthProvider

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>  {/* Envuelve toda la aplicación en AuthProvider */}
        <RefineKbarProvider>
          <ColorModeContextProvider>
            <AntdApp>
              <DevtoolsProvider>
                <Refine
                  dataProvider={dataProvider("http://localhost:8081")}
                  notificationProvider={useNotificationProvider}
                  routerProvider={routerBindings}
                  resources={[
                    {
                      name: "sensor_data",
                      list: "/sensor-data",
                      show: "/sensor-data/show/:id",
                    },
                  ]}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "45tfpI-kwct6U-ZnQSI5",
                  }}
                >
                  <Routes>
                    {/* Ruta pública de login */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Rutas protegidas */}
                    <Route
                      element={
                        <ProtectedRoute>
                          <ThemedLayoutV2
                            Header={Header}
                            Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                          >
                            <Outlet />
                          </ThemedLayoutV2>
                        </ProtectedRoute>
                      }
                    >
                      {/* Ruta principal de la aplicación */}
                      <Route
                        index
                        element={<NavigateToResource resource="sensor_data" />}
                      />
                      <Route path="/sensor-data">
                        <Route index element={<SensorDataList />} />
                        <Route path="show/:id" element={<SensorDataShow />} />
                      </Route>
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                      />
                      <Route path="/register" element={<Register />} />
                      <Route path="*" element={<ErrorComponent />} />
                    </Route>
                  </Routes>
                  <RefineKbar />
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler />
                  <DevtoolsPanel />
                </Refine>
              </DevtoolsProvider>
            </AntdApp>
          </ColorModeContextProvider>
        </RefineKbarProvider>
      </AuthProvider>  {/* Cierra el AuthProvider */}
    </BrowserRouter>
  );
}

export default App;
