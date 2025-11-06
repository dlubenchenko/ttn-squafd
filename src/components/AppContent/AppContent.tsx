import Content from 'antd/es/layout'

import styles from './AppContent.module.scss';
import { Card } from 'antd';

export default function AppContent({ children }: { children?: React.ReactNode }) {
    return (
        <Content className={styles.appContent}>
            <Card style={{height: '100%'}}>
                {children}
            </Card>
        </Content>
    )
}
