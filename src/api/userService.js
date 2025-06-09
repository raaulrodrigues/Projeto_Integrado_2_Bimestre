import axios from 'axios';
import {
    USER_SERVICE_URL,
    USER_SERVICE_LOGIN_URL,
    USER_SERVICE_ME_URL,
    USER_SERVICE_LOGOUT_URL
} from './config';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(USER_SERVICE_URL, userData);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
        const errorMessage = error.response?.data?.error || "Erro ao cadastrar usuário";
        throw new Error(errorMessage);
    }
};

export const loginUserApi = async (credentials) => {
    try {
        const params = new URLSearchParams();
        params.append('username', credentials.email);
        params.append('password', credentials.password);

        await axios.post(USER_SERVICE_LOGIN_URL, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: true
        });
        return { success: true };
    } catch (error) {
        console.error("Erro na API de login:", error.response?.data || error.message);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            throw new Error("Email ou senha inválidos.");
        }
        throw new Error("Falha na API de login.");
    }
};

export const getLoggedInUserDetails = async () => {
    try {
        const response = await axios.get(USER_SERVICE_ME_URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar detalhes do usuário logado:", error.response?.data || error.message);
        throw new Error("Não foi possível buscar detalhes do usuário.");
    }
};

export const logoutUserApi = async () => {
    try {
        await axios.post(USER_SERVICE_LOGOUT_URL, {}, { withCredentials: true });
    } catch (error) {
        console.error("Erro na API de logout:", error.response?.data || error.message);
        throw new Error("Falha ao fazer logout.");
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(USER_SERVICE_URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Erro ao listar usuários:", error.response?.data || error.message);
        throw error.response?.data || new Error("Erro ao listar usuários");
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${USER_SERVICE_URL}/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar usuário ${id}:`, error.response?.data || error.message);
        throw error.response?.data || new Error(`Erro ao buscar usuário ${id}`);
    }
};

export const getUserByEmail = async (email) => {
    try {
        const response = await axios.get(`${USER_SERVICE_URL}/email/${email}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar usuário pelo email ${email}:`, error.response?.data || error.message);
        throw error.response?.data || new Error(`Erro ao buscar usuário pelo email ${email}`);
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${USER_SERVICE_URL}/${id}`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar usuário ${id}:`, error.response?.data || error.message);
        throw error.response?.data || new Error(`Erro ao atualizar usuário ${id}`);
    }
};

export const deleteUser = async (id) => {
    try {
        await axios.delete(`${USER_SERVICE_URL}/${id}`, { withCredentials: true });
    } catch (error) {
        console.error(`Erro ao deletar usuário ${id}:`, error.response?.data || error.message);
        throw error.response?.data || new Error(`Erro ao deletar usuário ${id}`);
    }
};