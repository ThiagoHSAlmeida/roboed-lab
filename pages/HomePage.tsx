// Importa o React para criar o componente.
import React from 'react';
// Importa o componente `Link` do `react-router-dom` para criar links de navegação interna sem recarregar a página.
import { Link } from 'react-router-dom';
// Importa os ícones que serão usados nos cartões de atalho.
import { IconSearch, IconPlus, IconUpload, IconBook, IconFilter, IconUser, IconLayoutDashboard } from '../components/Icons';

/**
 * Componente HomePage: A página inicial da aplicação.
 * Funciona como um "hub" central, oferecendo uma busca principal e atalhos visuais
 * para as seções mais importantes do sistema.
 */
const HomePage: React.FC = () => {
  // Array de objetos que define os cartões de atalho.
  // Cada objeto contém o título, o caminho da rota (`to`), o componente do ícone e uma cor de fundo.
  // Estruturar os dados dessa forma facilita a renderização da lista de cartões com o método `.map()`.
  const shortcutCards = [
    { title: 'Adicionar Conteúdo', to: '/importar', icon: <IconPlus />, color: 'bg-blue-500' },
    { title: 'Importar Planilha/Arquivo', to: '/importar', icon: <IconUpload />, color: 'bg-green-500' },
    { title: 'Explorar Aulas', to: '/conteudos', icon: <IconBook />, color: 'bg-indigo-500' },
    { title: 'Filtros por BNCC', to: '/conteudos', icon: <IconFilter />, color: 'bg-purple-500' },
    { title: 'Modo Professor', to: '/professor', icon: <IconLayoutDashboard />, color: 'bg-yellow-500' },
    { title: 'Modo Aluno', to: '/aluno', icon: <IconUser />, color: 'bg-pink-500' },
  ];

  return (
    // Container principal com espaçamento vertical entre os filhos e uma animação de fade-in.
    <div className="space-y-8 animate-fade-in">
      {/* Cabeçalho da página com título e subtítulo. */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Bem-vindo ao EduRoboLab</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Sua plataforma para gestão de aulas e projetos de tecnologia e robótica.</p>
      </header>

      {/* Seção da Barra de Busca Semântica */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          {/* O campo de input para a busca. No momento, é apenas um elemento visual (placeholder). */}
          <input
            type="search"
            placeholder="Busque por termo, habilidade BNCC, disciplina..."
            className="w-full px-4 py-3 pl-12 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 bg-white dark:bg-gray-700"
            aria-label="Busca Semântica (IA)" // `aria-label` é importante para acessibilidade.
          />
          {/* Ícone de busca posicionado absolutamente dentro do campo de input. */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500">
            <IconSearch />
          </div>
        </div>
      </div>

      {/* Grade (grid) de Cartões de Atalho */}
      {/* O layout da grade é responsivo: 1 coluna em telas pequenas, 2 em médias e 3 em grandes. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/*
          Usa o método `.map()` para iterar sobre o array `shortcutCards` e renderizar
          um cartão para cada item. O `key` é essencial para o React otimizar a renderização de listas.
        */}
        {shortcutCards.map((card, index) => (
          // Cada cartão é um `Link` que direciona para a rota especificada em `card.to`.
          <Link key={index} to={card.to}>
            {/* O `div` interno representa o cartão visualmente, com estilos para cor, sombra e efeitos de hover. */}
            <div className={`p-6 rounded-lg text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${card.color}`}>
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{card.icon}</div>
                <h3 className="text-xl font-semibold">{card.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Exporta o componente para que ele possa ser usado em outras partes da aplicação (como no `App.tsx`).
export default HomePage;
