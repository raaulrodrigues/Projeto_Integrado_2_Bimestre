import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserApi, getLoggedInUserDetails } from '../api/userService';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { loginContext } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);
        try {
            await loginUserApi({ email, password });
            const userDetails = await getLoggedInUserDetails();

            if (userDetails && userDetails.id) {
                loginContext(userDetails);
                navigate('/');
            } else {
                setError("Não foi possível obter os detalhes do usuário após o login.");
            }
        } catch (err) {
            setError(err.message || "Falha no login. Verifique suas credenciais.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login-email">Email:</label>
                    <input
                        type="email"
                        id="login-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="login-password">Senha:</label>
                    <input
                        type="password"
                        id="login-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
            <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
        </div>
    );
}

export default LoginPage;