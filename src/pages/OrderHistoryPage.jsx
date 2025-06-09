import React, { useState, useEffect } from 'react';

function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setOrders([
            ]);
            setLoading(false);
        }, 500);
    }, []);

    if (loading) return <p>Carregando histórico de pedidos...</p>;
    if (error) return <p>Erro ao carregar histórico: {error}</p>;

    return (
        <div>
            <h2>Seu Histórico de Pedidos</h2>
            {orders.length === 0 ? (
                <p>Você ainda não fez nenhum pedido ou o histórico não pôde ser carregado.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {orders.map(order => (
                        <li key={order.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                            <p><strong>Pedido ID:</strong> {order.id}</p>
                            <p><strong>Data:</strong> {new Date(order.dataPedido).toLocaleDateString()}</p>
                            <p><strong>Total:</strong> R$ {order.total.toFixed(2)}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default OrderHistoryPage;