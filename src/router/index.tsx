import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Main, Parser, SidebarEdit, Statistic, UserEdit } from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import { Layout, NotFound } from "../components";
import AccessGuard from "./AccessGuard";

const privateRoutes = [
  { path: "/", element: <Main /> },
  { path: "/sidebar-edit", element: <SidebarEdit /> },
  { path: "/users-edit", element: <UserEdit /> },
  { path: "/parser/:parserId", element: <Parser /> },
  { path: "/statistic", element: <Statistic /> },
  { path: "/*", element: <NotFound /> },
];

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          {privateRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={
                <AccessGuard>
                  {element}
                </AccessGuard>
              }
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
