import { Button } from 'antd'
import Header from 'antd/es/layout'
import { useAuthContext } from '../../context';
import { useAppMessage } from '../../hooks';

export default function AppHeader() {
    const { logout } = useAuthContext();
    const { showMessageHandler } = useAppMessage();

    const logoutHandler = () => {
        logout();
        showMessageHandler.success('Ви вийшли з системи');
    }
    return (
        <Header>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '.5rem .5rem'
            }}>
                <Button type="primary" onClick={logoutHandler}>Вихід</Button>

            </div>
        </Header>
    )
}
