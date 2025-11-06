// src/router/AccessGuard.tsx
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import NotFound from "../components/NotFound/NotFound";

export default function AccessGuard({ children }: { children: React.ReactNode }) {
  const { menu, authLoading } = useAuthContext();
  const location = useLocation();

  if (authLoading) return null; // або спіннер

  // Знаходимо пункт меню, який відповідає поточному шляху
  const hasAccess = menu?.some(item => {
    // Для динамічних роутів типу /parser/:parserId — перевіряємо початок шляху
    if (item.path.includes("/:")) {
      const base = item.path.split("/:")[0];
      return location.pathname.startsWith(base);
    }
    return item.path === location.pathname;
  });

  if (!hasAccess) return <NotFound />;

  return <>{children}</>;
}