import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './router/index.tsx'

import 'antd/dist/reset.css';
import LanguageProvider from './context/LanguageContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

import './styles/_colors.scss';

import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <AppRouter />
      </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
)
