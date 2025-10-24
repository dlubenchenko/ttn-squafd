import Sider from 'antd/es/layout/Sider'
import { useAuthContext } from '../../context'
import { Menu } from 'antd'

export default function AppSider() {

  const { menu } = useAuthContext();

  if (menu) {
    console.log(menu);

  }


  return (
    <Sider style={{ color: '#fff' }}>
      <div>
        <h2 style={{ textAlign: 'center', padding: '1rem 0' }}>
          INVOL SQUAD
        </h2>
      </div>
      <Menu theme='dark' items={menu?.map(item => ({ key: item.key, label: item.title }))} inlineCollapsed={false} />
    </Sider>
  )
}

