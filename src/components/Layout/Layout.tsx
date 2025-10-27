import { Layout as AntLayout } from 'antd';
import { AppFooter, AppHeader, AppSider, AppContent } from '../index'
import { useAuthContext } from '../../context';
import { Spinner } from '../common/';

import styles from './Layout.module.scss'
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const { user, menu } = useAuthContext();


  if (!user && !menu) {
    return <Spinner />;
  }

  return (
    <AntLayout>
      <AppSider />
      <AntLayout>
        <AppHeader />
        <AppContent>
          <Outlet />
        </AppContent>
        <AppFooter />
      </AntLayout>
    </AntLayout>
  )
}
