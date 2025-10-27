import { Dropdown as AntDropdown, Button } from "antd";
import { UserOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons';
import type { FirebaseUser } from "../../../types";

import styles from './Dropdown.module.scss';

export default function Dropdown({ user, logout }: { user: FirebaseUser, logout: () => void }) {
    const profileMenu = {
        items: [
            {
                key: 'edit',
                icon: <EditOutlined />,
                label: 'Редагувати профіль',
            },
            {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 'Вийти',
                onClick: logout,
            },
        ],
        onClick: ({ key }: { key: string }) => {
            if (key === 'logout') logout();
        },
    };

    return (
        <AntDropdown menu={profileMenu} placement="bottomRight" trigger={['click']}>
            <Button type="default" icon={<UserOutlined />} className={styles.dropdown}>
                {user?.displayName || user?.email}
            </Button>
        </AntDropdown >
    )
}
