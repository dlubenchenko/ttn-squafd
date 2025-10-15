import { useContext } from 'react';
import type { ContextProviderProps } from '../types'
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useAppMessage } from '../hooks';
import Spinner from '../components/common/Spinner/Spinner';

export default function ProtectedRoute({ children }: ContextProviderProps) {
    const { authLoading, user } = useContext(AuthContext);
    const { contextHolder } = useAppMessage();

    if (authLoading) {
        return (
            <>  {contextHolder}
                <Spinner />
            </>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children
}
