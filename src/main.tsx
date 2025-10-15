import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './router/index.tsx'

import 'antd/dist/reset.css';
import LanguageProvider from './context/LanguageContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { MenuProvider } from './context/MenuContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <MenuProvider>
        <LanguageProvider>
          <AppRouter />
        </LanguageProvider>
      </MenuProvider>
    </AuthProvider>
  </StrictMode>,
)
