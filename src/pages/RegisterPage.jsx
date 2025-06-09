import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/userService';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError("As senhas não coincidem!");
            return;
        }
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const userData = { name, email, password };
            await registerUser(userData);
            setSuccess("Cadastro realizado com sucesso! Você pode continuar comprando ou ir para o carrinho.");
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            setError(err.message || "Falha no cadastro. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Cadastro de Novo Usuário</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="register-name">Nome:</label>
                    <input type="text" id="register-name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="register-email">Email:</label>
                    <input type="email" id="register-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="register-password">Senha:</label>
                    <input type="password" id="register-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="register-confirm-password">Confirmar Senha:</label>
                    <input type="password" id="register-confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;