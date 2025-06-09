import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../api/orderService';
import { processPayment } from '../api/paymentService';

function CheckoutPage() {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handlePlaceOrderAndPay = async () => {
        if (!cartItems || cartItems.length === 0) {
            setError("Seu carrinho está vazio. Adicione itens antes de prosseguir.");
            return;
        }

        setProcessing(true);
        setError('');
        setSuccessMessage('');

        const guestUserId = 0; // ID de usuário placeholder para convidados

        const orderData = {
            usuarioId: guestUserId,
            produtoIds: cartItems.map(item => item.id),
            total: getCartTotal(),
        };

        try {
            const createdOrder = await createOrder(orderData);

            if (createdOrder && createdOrder.id) {
                const paymentData = {
                    pedidoId: createdOrder.id,
                    valor: createdOrder.total,
                };
                const paymentResult = await processPayment(paymentData);

                if (paymentResult && paymentResult.status === "CONFIRMADO") {
                    setSuccessMessage(`Pagamento confirmado! Pedido #${createdOrder.id} realizado com sucesso. Você será redirecionado.`);
                    clearCart();
                    setTimeout(() => {
                        navigate('/orders');
                    }, 4000);
                } else {
                    setError(`Falha no pagamento: ${paymentResult ? paymentResult.status : 'Status desconhecido'}. Pedido #${createdOrder.id} criado, mas aguarda pagamento.`);
                }
            } else {
                setError("Falha ao criar o pedido no backend. Tente novamente.");
            }
        } catch (err) {
            console.error("Erro detalhado ao finalizar pedido ou pagar:", err);
            setError(err.message || "Ocorreu um erro ao processar seu pedido. Verifique os detalhes e tente novamente.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div>
            <h2>Finalizar Pedido</h2>

            {error && <p style={{ color: 'red', border: '1px solid red', padding: '10px', marginTop: '10px' }}>Erro: {error}</p>}
            {successMessage && <p style={{ color: 'green', border: '1px solid green', padding: '10px', marginTop: '10px' }}>{successMessage}</p>}

            <div style={{ marginTop: '20px', marginBottom: '20px', padding: '15px', border: '1px solid #eee' }}>
                <h3>Resumo do Pedido</h3>
                {cartItems && cartItems.length > 0 ? (
                    <>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {cartItems.map(item => (
                                <li key={item.id} style={{ marginBottom: '5px' }}>
                                    {item.name} (Quantidade: {item.quantity}) - R$ {(item.price * item.quantity).toFixed(2)}
                                </li>
                            ))}
                        </ul>
                        <hr />
                        <p style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
                            Total: R$ {getCartTotal().toFixed(2)}
                        </p>
                    </>
                ) : (
                    !successMessage && <p>Seu carrinho está vazio.</p>
                )}
            </div>

            {cartItems.length > 0 && !successMessage && (
                <button
                    onClick={handlePlaceOrderAndPay}
                    disabled={processing}
                    style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer' }}
                >
                    {processing ? "Processando Pagamento..." : "Realizar Pagamento e Finalizar Pedido"}
                </button>
            )}
            {cartItems.length === 0 && !successMessage && (
                <Link to="/">Voltar para a loja</Link>
            )}
        </div>
    );
}

export default CheckoutPage;