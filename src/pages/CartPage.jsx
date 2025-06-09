// src/pages/CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    if (!cartItems || cartItems.length === 0) {
        return (
            <div>
                <h2>Seu Carrinho de Compras</h2>
                <p>Seu carrinho está vazio.</p>
                <Link to="/">Continuar comprando</Link>
            </div>
        );
    }

    return (
        <div>
            <h2>Seu Carrinho de Compras</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {cartItems.map(item => (
                    <li key={item.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4>{item.name}</h4>
                            <p>Preço Un.: R$ {item.price != null ? item.price.toFixed(2) : 'N/A'}</p>
                            <div>
                                Quantidade:
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ margin: '0 5px' }}>-</button>
                                {item.quantity}
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ margin: '0 5px' }}>+</button>
                            </div>
                        </div>
                        <div>
                            <p>Subtotal: R$ {(item.price * item.quantity).toFixed(2)}</p>
                            <button onClick={() => removeFromCart(item.id)}>Remover</button>
                        </div>
                    </li>
                ))}
            </ul>
            <h3>Total do Carrinho: R$ {getCartTotal().toFixed(2)}</h3>
            <button onClick={clearCart} style={{ marginRight: '10px' }}>Limpar Carrinho</button>
            <Link to="/checkout">
                <button>Finalizar Pedido</button>
            </Link>
        </div>
    );
}

export default CartPage;