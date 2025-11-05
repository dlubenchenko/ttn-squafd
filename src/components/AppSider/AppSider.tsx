import { useState, useMemo } from 'react';
import Sider from 'antd/es/layout/Sider'
import { useAuthContext } from '../../context'
import { Menu } from 'antd'
import appStyles from './AppSider.module.scss'
import { buildMenuTree, mapMenuToAntdItems } from '../../utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { getActiveMenuItem, handleMenuClick, sortMenu } from '../../helpers/menuHandler';

export default function AppSider() {
  const { menu, user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const sortedMenu = useMemo(() => sortMenu(menu || [], 'main'), [menu]);
  const treeMenu = useMemo(() => buildMenuTree(sortedMenu || []), [menu]);
  const menuItems = useMemo(() => mapMenuToAntdItems(treeMenu), [treeMenu]);
  const flatMenu = sortedMenu || [];

  const activeMenuItem = getActiveMenuItem(flatMenu, location.pathname);
  const selectedKeys = activeMenuItem ? [activeMenuItem.key] : [];

  function onMenuClick({ key }: { key: string }) {
    handleMenuClick(flatMenu, key, navigate);
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
          selectedKeys={selectedKeys}
          onClick={onMenuClick}
        />
      </div>
    </Sider>
  )
}

