// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/productService';
import { useCart } from '../contexts/CartContext'; // Importe o hook useCart

function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart(); // Obtenha a função addToCart do contexto

    useEffect(() => {
        if (id) {
            const fetchProductDetails = async () => {
                try {
                    setError(null);
                    setLoading(true);
                    const data = await getProductById(id);
                    setProduct(data);
                } catch (err) {
                    setError(err.message || `Falha ao carregar detalhes do produto com id ${id}.`);
                    setProduct(null);
                } finally {
                    setLoading(false);
                }
            };
            fetchProductDetails();
        } else {
            setError("ID do produto não fornecido.");
            setLoading(false);
        }
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product); // Chame a função do contexto
        }
    };

    if (loading) return <p>Carregando detalhes do produto...</p>;
    if (error) return <p>Erro: {error}</p>;
    if (!product) return <p>Produto não encontrado ou ID inválido.</p>;

    return (
        <div>
            <h1>{product.name}</h1>
            <p><strong>Tipo:</strong> {product.type}</p>
            <p><strong>Descrição:</strong> {product.description}</p>
            <p><strong>Peso:</strong> {product.weight} kg</p>
            <p><strong>Preço:</strong> R$ {product.price != null ? product.price.toFixed(2) : 'N/A'}</p>
            <p><strong>Disponibilidade:</strong> {product.available ? "Em estoque" : "Fora de estoque"}</p>
            {product.available && <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>}
        </div>
    );
}

export default ProductDetailPage;