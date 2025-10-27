import Content from 'antd/es/layout'

export default function AppContent({ children }: { children?: React.ReactNode }) {
    return (
        <Content
            style={{ padding: '1rem', textAlign: 'center', background: '#76a9daff', color: '#fff' }}
        >
            {children}
        </Content>
    )
}
