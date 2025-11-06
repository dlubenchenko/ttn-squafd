import { useContext, useEffect } from 'react';
import { LoginForm } from '../../components/common'
import { userLanguageHandler } from '../../context/LanguageContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/common';
import styles from '../../pages/Login/Login.module.scss'

export default function Login() {
  const { language } = userLanguageHandler(); // вибір мови користувача (UA/KZ/EN)
  const { user, login, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      navigate("/", { replace: true });
    }
  }, [user?.email, navigate]);

  const handleLogin = async (values: { email: string, password: string }) => {
    try {
      await login(values.email, values.password);
      localStorage.setItem('justLoggedIn', 'true');
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
      <LoginForm handleLogin={handleLogin} />
    </div >
  )
}
