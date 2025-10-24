import { useState } from 'react';

import Sider from 'antd/es/layout/Sider'
import { useAuthContext } from '../../context'
import { Menu } from 'antd'

import appStyles from './AppSider.module.scss'

export default function AppSider() {
  const { menu, user } = useAuthContext();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      className={appStyles.appSider}
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      collapsible
    >
      <div>
        <h2 className={collapsed ?
          appStyles.appSiderHeaderCollapsed :
          appStyles.appSiderHeader}>
          {collapsed ?
            user?.division?.toUpperCase() :
            `${user?.division?.toUpperCase()} SQUAD`}
        </h2>
        <Menu
          className={appStyles.appSiderMenu}
          theme='dark'
          items={menu?.map(item => ({ key: item.key, label: item.title }))}
        />
      </div>
    </Sider>
  )
}

