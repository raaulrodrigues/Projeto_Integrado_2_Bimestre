import axios from 'axios';
import { PAYMENT_SERVICE_URL } from './config';

export const processPayment = async (paymentData) => {
    try {
        const response = await axios.post(PAYMENT_SERVICE_URL, paymentData);
        return response.data;
    } catch (error) {
        console.error("Erro ao processar pagamento:", error.response?.data || error.message);
        throw error.response?.data || new Error("Erro ao processar pagamento");
    }
};