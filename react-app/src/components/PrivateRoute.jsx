import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children }) => {
    const [isValidToken, setIsValidToken] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email'); // Assuming you saved the email during login

    useEffect(() => {
        const verifyToken = async () => {
            if (!email || !token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/auth/verify-token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ email }),  // Send email to verify token
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsValidToken(data.isValid);  // Assuming the response has an isValid field
                }
            } catch (error) {
                console.error('Error verifying token:', error);
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [email, token]);

    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    if (!isValidToken) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
