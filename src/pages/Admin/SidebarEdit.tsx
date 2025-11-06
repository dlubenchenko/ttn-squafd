import { useEffect, useState } from "react";
import { Table } from "antd";

import { getDataFromFirestore } from "../../api"
import type { RawMenuValue } from "../../types";
import { sidebarCols } from "../../helpers";



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
      <Table
        columns={sidebarCols()}
        dataSource={menuData || []}
        pagination={false}
      />
      {/* {menuData && menuData.map(menuItem => {
        return <p key={menuItem.key}>{menuItem.label}</p>;
      })} */}
    </>
  )
}
