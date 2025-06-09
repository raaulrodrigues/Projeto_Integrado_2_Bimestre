import axios from 'axios';
import { CATALOG_SERVICE_URL } from './config';

const API_URL = 'http://localhost:8081';

export const getAllProducts = async () => {
    try {
        const response = await axios.get(CATALOG_SERVICE_URL);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar todos os produtos:", error.response?.data || error.message);
        throw error.response?.data || new Error("Erro ao buscar todos os produtos");
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${CATALOG_SERVICE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar produto com id ${id}:`, error.response?.data || error.message);
        throw error.response?.data || new Error(`Erro ao buscar produto com id ${id}`);
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await axios.post(CATALOG_SERVICE_URL, productData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar produto:", error.response?.data || error.message);
        throw error.response?.data || new Error("Erro ao criar produto");
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${CATALOG_SERVICE_URL}/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar produto ${id}:`, error.response?.data || error.message);
        throw error.response?.data || new Error(`Erro ao atualizar produto ${id}`);
    }
};

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${CATALOG_SERVICE_URL}/${id}`);
    } catch (error) {
        console.error(`Erro ao deletar produto ${id}:`, error.response?.data || error.message);
        throw error.response?.data || new Error(`Erro ao deletar produto ${id}`);
    }
};