import { Layout as AntLayout, App } from 'antd';
import { AppFooter, AppHeader, AppSider, AppContent } from '../index'
import { useAuthContext } from '../../context';
import Spinner from '../common/Spinner/Spinner';

const layoutStyle = {
  overflow: 'hidden',
  width: '100%%',
  maxWidth: '100vw',
  height: '100vh',
};

export default function Layout() {
  const { user, menu } = useAuthContext();

  if (!user && !menu) {
    return <Spinner />;
  }

  return (
    <div>
      <AntLayout style={layoutStyle}>
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
