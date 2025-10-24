import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Login, SidebarEdit, UserEdit } from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import { Layout } from "../components";

const privateRoutes = [
  { path: "/", element: <Layout /> },
  { path: "/sidebar-edit", element: <SidebarEdit /> },
  { path: "/user-edit", element: <UserEdit /> },
  // { path: "/main", element: <Layout /> },
];

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
          {privateRoutes.map(({ path, element }) => (
            <Route
              path={path}
              element={element}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
