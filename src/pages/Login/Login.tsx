import { useContext, useEffect } from 'react';
import { Input, Button } from '../../components/common'

import styles from './Login.module.scss'

import { Badge, Form } from 'antd'

import { userLanguageHandler } from '../../context/LanguageContext';
import { AuthContext } from '../../context/AuthContext';

import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/common/Spinner/Spinner';

export default function Login() {
  const { language } = userLanguageHandler(); // вибір мови користувача (UA/KZ/EN)

  const { user, login, authLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      console.log(`${language.login.greet} ${user.displayName || user.email}!`);

      navigate("/", { replace: true });
    }
  }, [user?.email, navigate]);

  const handleLogin = async (values: { email: string, password: string }) => {
    try {
      await login(values.email, values.password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(language.login.authError[error.message] || error.message);
      } else {
        console.error('Login failed');
      }
    } finally {
    }
  }

  if (authLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <div className={styles.loginContainer}>
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
    </div >
  )
}
