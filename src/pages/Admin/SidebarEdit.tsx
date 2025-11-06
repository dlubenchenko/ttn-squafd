import { useEffect, useState } from "react";
import { getDataFromFirestore } from "../../api"
import type { RawMenuValue } from "../../types";

export default function SidebarEdit() {
  const [menuData, setMenuData] = useState<RawMenuValue[] | null>(null);

  useEffect(() => {
    getDataFromFirestore('menu').then((data) => {
      setMenuData(Array.isArray(data) ? data : []);
      // console.log(data);
    });
  }, [])


  return (
    <>
      <h2>Sidebar Edit Page</h2>
      {menuData && menuData.map(menuItem => {
        return <p key={menuItem.key}>{menuItem.label}</p>;
      })}
    </>
  )
}
