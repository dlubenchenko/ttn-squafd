import { Button, Space } from 'antd'
import Header from 'antd/es/layout'
import { useLocation } from 'react-router-dom';

import { useAuthContext } from '../../context';
import { getColor } from '../../utils/colors';

import styles from './AppHeader.module.scss';

import Clock from './HeaderClock/Clock';
import Dropdown from '../common/Dropdown/Dropdown';

export default function AppHeader() {
    const { menu, user, logout } = useAuthContext();
    const location = useLocation();

    const pageTitle = menu?.find(item => item.path === location.pathname)?.label || 'Невідома сторінка';

    const logoutHandler = () => {
        logout();
    }
    return (
        <Header>
            <div className={styles.appHeader}>
                <span className={styles.pageTitle}>{pageTitle}</span>
                <Space.Compact className={styles.headerGroup}>
                    <Button className={styles.clock} disabled>
                        <Clock timeZone="Europe/Kyiv" label="UA" />
                    </Button>
                    <Button className={styles.clock} disabled>
                        <Clock timeZone="Asia/Almaty" label="KZ" />
                    </Button>
                    <Button className={styles.clock} disabled>
                        <Clock timeZone="America/New_York" label="US" />
                    </Button>
                    <Button className={styles.division} style={{ color: getColor(user?.division || '') }} disabled>
                        <div>{user?.division?.toUpperCase()}</div>
                    </Button>
                    {user && <Dropdown user={user} logout={logoutHandler} />}
                </Space.Compact>

            </div>
        </Header>
    )
}
