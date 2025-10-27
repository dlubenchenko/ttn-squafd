import { Button } from 'antd'
import Header from 'antd/es/layout'
import { useAuthContext } from '../../context';

export default function AppHeader() {
    const { logout } = useAuthContext();

    const logoutHandler = () => {
        logout();
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
