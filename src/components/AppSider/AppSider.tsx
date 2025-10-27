import { useState, useMemo } from 'react';

import Sider from 'antd/es/layout/Sider'
import { useAuthContext } from '../../context'
import { Menu } from 'antd'

import appStyles from './AppSider.module.scss'
import { buildMenuTree, mapMenuToAntdItems } from '../../utils';
import { useNavigate } from 'react-router-dom';

export default function AppSider() {
  const { menu, user } = useAuthContext();
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false);

  const treeMenu = useMemo(() => buildMenuTree(menu || []), [menu]);
  const menuItems = useMemo(() => mapMenuToAntdItems(treeMenu), [treeMenu]);

  function handleMenuClick({ key }: { key: string }) {
    // Знаходимо пункт меню по key
    const flatMenu = menu || [];
    const item = flatMenu.find(i => i.key === key);
    if (item && item.path) {
      navigate(item.path);
    }
  }

  return (
    <Sider
      className={appStyles.appSider}
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      collapsible
      width={250}
    >
      <div>
        <h2 className={collapsed ?
          appStyles.appSiderHeaderCollapsed :
          appStyles.appSiderHeader}>
          {`${user?.division?.toUpperCase()} SQUAD`}
        </h2>
        <Menu
          className={appStyles.appSiderMenu}
          theme='dark'
          mode='inline'
          items={menuItems}
          onClick={handleMenuClick}
        />
      </div>
    </Sider>
  )
}

