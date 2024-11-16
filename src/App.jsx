import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SuperAdmin from "./pages/SuperAdmin";
import Admin from "./pages/Admin";
import Residente from "./pages/Residente";
import Seguridad from "./pages/Seguridad";
import Error from "./pages/Error";
import PrivateRoute from "./utils/PrivateRoute";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import SuperAdminCreate from "./components/superadmin/SuperAdminCreate";
import SuperAdminView from "./components/superadmin/SuperAdminView";
import AdminCreate from "./components/admin/AdminCreate";
import AdminView from "./components/admin/AdminView";
import ChangePassword from "./pages/ChangePassword";
import AdminUpdate from "./components/admin/AdminUpdate";
import AdminPaseCreate from "./components/admin/AdminPaseCreate";
import AdminPaseView from "./components/admin/AdminPaseView";
import SecurityGuardViewPase from "./components/securityguard/SecurityGuardViewPase";
import SecurityGuardCreate from "./components/securityguard/SecurityGuardCreate";
import SecurityGuardViewRegister from "./components/securityguard/SecurityGuardViewRegister";
import SecurityGuardUpdate from "./components/securityguard/SecurityGuardUpdate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-general" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-general"
          element={
            <PrivateRoute>
              <RoleBaseRoutes requiredRole={["superadmin"]}>
                <SuperAdmin />
              </RoleBaseRoutes>
            </PrivateRoute>
          }
        >
          <Route index element={<SuperAdminView />}></Route>
          <Route
            path="/admin-general/alta"
            element={<SuperAdminCreate />}
          ></Route>
        </Route>
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <Admin />
              </RoleBaseRoutes>
            </PrivateRoute>
          }
        >
          <Route index element={<AdminView />}></Route>
          <Route path="/admin/alta" element={<AdminCreate />}></Route>
          <Route path="/admin/cambiar" element={<ChangePassword />}></Route>
          <Route path="/admin/modificar/:id" element={<AdminUpdate />}></Route>
          <Route path="/admin/altapase" element={<AdminPaseCreate />}></Route>
          <Route path="/admin/verpase" element={<AdminPaseView />}></Route>
        </Route>
        <Route
          path="/residente"
          element={
            <PrivateRoute>
              <RoleBaseRoutes requiredRole={["residente"]}>
                <Residente />
              </RoleBaseRoutes>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/seguridad"
          element={
            <PrivateRoute>
              <RoleBaseRoutes requiredRole={["seguridad"]}>
                <Seguridad />
              </RoleBaseRoutes>
            </PrivateRoute>
          }
        >
          <Route index element={<SecurityGuardCreate />}></Route>
          <Route path="/seguridad/cambiar" element={<ChangePassword />}></Route>
          <Route
            path="/seguridad/verpase"
            element={<SecurityGuardViewPase />}
          ></Route>
          <Route
            path="/seguridad/verregistro"
            element={<SecurityGuardViewRegister />}
          ></Route>
          <Route
            path="/seguridad/modificar/:id"
            element={<SecurityGuardUpdate />}
          ></Route>
        </Route>
        <Route path="/error" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
