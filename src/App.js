import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import { CartProvider } from './contexts/CartContext';

function App() {
    return (
        <CartProvider>
            <Router>
                <div>
                    <nav style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', gap: '15px' }}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/register">Cadastro</Link></li>
                            <li><Link to="/cart">Carrinho</Link></li>
                            <li><Link to="/orders">Meus Pedidos</Link></li>
                        </ul>
                    </nav>

                    <div style={{ padding: '20px' }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/product/:id" element={<ProductDetailPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/orders" element={<OrderHistoryPage />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;