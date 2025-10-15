import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Login, Main, SidebarEdit, UserEdit } from "../pages";
import ProtectedRoute from "./ProtectedRoute";

const privateRoutes = [
  { path: "/", element: <Main /> },
  { path: "/sidebar-edit", element: <SidebarEdit /> },
  { path: "/user-edit", element: <UserEdit /> },
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
