import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
}

export function Protected({ children, isAuthenticated }: ProtectedProps) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    // Render loading state if authentication check is not completed
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <>{children}</> : null;
}
