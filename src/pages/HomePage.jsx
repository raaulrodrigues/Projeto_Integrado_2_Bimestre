// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../api/productService';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setError(null);
                setLoading(true);
                const data = await getAllProducts();
                setProducts(data || []);
            } catch (err) {
                setError(err.message || "Falha ao carregar produtos.");
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <p>Carregando produtos...</p>;
    if (error) return <p>Erro ao carregar produtos: {error}</p>;

    return (
        <div>
            <h1>Rações Disponíveis</h1>
            {products.length === 0 ? (
                <p>Nenhum produto encontrado no momento.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {products.map(product => (
                        <li key={product.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                            <Link to={`/product/${product.id}`}>
                                <h3>{product.name}</h3>
                            </Link>
                            <p>Tipo: {product.type}</p>
                            <p>Preço: R$ {product.price != null ? product.price.toFixed(2) : 'N/A'}</p>
                            <p>{product.available ? "Disponível" : "Indisponível"}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default HomePage;