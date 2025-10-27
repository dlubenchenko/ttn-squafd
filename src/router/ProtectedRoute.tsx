import { useContext } from 'react';
import type { ContextProviderProps } from '../types'
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Spinner } from '../components/common';

export default function ProtectedRoute({ children }: ContextProviderProps) {
    const { authLoading, user } = useContext(AuthContext);

    if (authLoading) {
        return (
            <>
                <Spinner />
            </>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children
}
