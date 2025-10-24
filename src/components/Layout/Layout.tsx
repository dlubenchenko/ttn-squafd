import { Layout as AntLayout } from 'antd';
import { AppFooter, AppHeader, AppSider, AppContent } from '../index'
import { useAuthContext } from '../../context';
import Spinner from '../common/Spinner/Spinner';

export default function Layout() {
  const { user, menu } = useAuthContext();

  if (!user && !menu) {
    return <Spinner />;
  }

  return (
    <div>
      <AntLayout>
        <AppSider />
        <AntLayout>
          <AppHeader />
          <AppContent />
          <AppFooter />
        </AntLayout>
      </AntLayout>
    </div>
  )
}
