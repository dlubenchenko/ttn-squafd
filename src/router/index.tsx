import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Main, SidebarEdit, UserEdit } from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import { Layout, NotFound } from "../components";

const privateRoutes = [
  { path: "/", element: <Main /> },
  { path: "/sidebar-edit", element: <SidebarEdit /> },
  { path: "/users-edit", element: <UserEdit /> },
  { path: "/*", element: <NotFound /> },
  // { path: "/main", element: <Layout /> },
];

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          {privateRoutes.map(({ path, element }) => (
            <Route
              path={path}
              element={element}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
