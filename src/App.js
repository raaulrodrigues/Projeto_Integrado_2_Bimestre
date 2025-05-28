import { useEffect, useState } from "react";
import Card from './components/ui/card';
import Button from './components/ui/button';
import Input from './components/ui/input';
import axios from "axios";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8081/api/produtos").then((res) => {
      setProdutos(res.data);
    });
  }, []);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const produtosFiltrados = produtos.filter((p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
      <main className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Plataforma de Rações</h1>

        <div className="flex gap-4 mb-6">
          <Input
              placeholder="Buscar ração..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="max-w-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {produtosFiltrados.map((produto) => (
              <Card key={produto.id} className="rounded-2xl shadow-md">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{produto.nome}</h2>
                  <p className="text-sm text-gray-600 mb-2">{produto.descricao}</p>
                  <p className="font-bold mb-2">R$ {produto.preco.toFixed(2)}</p>
                  <Button onClick={() => adicionarAoCarrinho(produto)}>
                    Adicionar ao Carrinho
                  </Button>
                </CardContent>
              </Card>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Carrinho</h2>
          {carrinho.length === 0 ? (
              <p>Seu carrinho está vazio.</p>
          ) : (
              <ul className="space-y-2">
                {carrinho.map((item, index) => (
                    <li key={index} className="border p-2 rounded-lg">
                      {item.nome} - R$ {item.preco.toFixed(2)}
                    </li>
                ))}
              </ul>
          )}
        </div>
      </main>
  );
}