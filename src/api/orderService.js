import axios from 'axios';
import { ORDER_SERVICE_URL } from './config';

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(ORDER_SERVICE_URL, orderData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar pedido:", error.response?.data || error.message);
        throw error.response?.data || new Error("Erro ao criar pedido");
    }
};

export const getOrdersByUserId = async (userId) => {
    try {
        const response = await axios.get(`${ORDER_SERVICE_URL}/usuario/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar pedidos para o usuário ${userId}:`, error.response?.data || error.message);
        throw error.response?.data || new Error(`Erro ao buscar pedidos para o usuário ${userId}`);
    }
};

export const getOrderById = async (orderId) => {
    try {
        const response = await axios.get(`${ORDER_SERVICE_URL}/${orderId}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar pedido com ID ${orderId}:`, error.response?.data || error.message);
        throw error.response?.data || new Error(`Erro ao buscar pedido com ID ${orderId}`);
    }
};