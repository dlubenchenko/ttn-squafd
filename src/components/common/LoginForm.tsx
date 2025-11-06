import { Badge, Form } from "antd";
import { Input, Button } from "./";


import styles from '../../pages/Login/Login.module.scss'
import { userLanguageHandler } from '../../context/LanguageContext';

interface LoginFormProps {
    handleLogin: (values: { email: string, password: string }) => Promise<void>;
}

export default function LoginForm({ handleLogin }: LoginFormProps) {
    const { language } = userLanguageHandler(); // вибір мови користувача (UA/KZ/EN)

    return (
        <Badge.Ribbon text="TTN SQUAD" placement='start' color='#764ba2'>
            <Form className={styles.loginForm} onFinish={handleLogin}>
                <h2 className={styles.loginTitle}>{language.login.title}</h2>
                <p className={styles.loginSubtitle}>{language.login.subtitle}</p>
                <Form.Item
                    name='email'
                    rules={[{ required: true, message: language.login.emailMessage }]}
                >
                    <Input placeholder={language.login.emailPlaceholder} />
                </Form.Item>

                <Form.Item
                    name='password'
                    rules={[{ required: true, message: language.login.passwordMessage }]}
                >
                    <Input.Password placeholder={language.login.passwordPlaceholder} />
                </Form.Item>

                <Form.Item>
                    <Button className={styles.loginButton} type='primary' htmlType='submit' block>
                        {language.login.button}
                    </Button>
                </Form.Item>
            </Form>
        </Badge.Ribbon>
    )
}
