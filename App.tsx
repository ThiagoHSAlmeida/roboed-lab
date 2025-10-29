// Importa o React e hooks como `useState` para gerenciar o estado do componente.
import React, { useState } from 'react';
// Importa componentes do `react-router-dom` para gerenciar a navegação entre páginas (rotas).
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// Importa os componentes de página, cada um representando uma tela da aplicação.
import HomePage from './pages/HomePage';
import ConteudosPage from './pages/ConteudosPage';
import ConteudoDetailPage from './pages/ConteudoDetailPage';
import ImportarPage from './pages/ImportarPage';
import ProfessorPage from './pages/ProfessorPage';
import AlunoPage from './pages/AlunoPage';
import ConfigPage from './pages/ConfigPage';

// Importa os componentes de ícones para serem usados na interface.
import { IconBook, IconLayoutDashboard, IconSettings, IconUser, IconUpload, IconHome, IconMenu, IconX } from './components/Icons';

// Define um tipo para o modo do usuário, garantindo que só pode ser 'professor' ou 'aluno'.
type UserMode = 'professor' | 'aluno';

/**
 * Componente raiz da aplicação.
 * O principal papel deste componente é configurar o `HashRouter`, que habilita
 * a navegação baseada em rotas no estilo "single-page application" (SPA).
 * O `HashRouter` usa a parte da URL após o '#' para manter a UI em sincronia com a URL.
 */
const App: React.FC = () => {
  return (
    <HashRouter>
      <MainLayout />
    </HashRouter>
  );
};

/**
 * Componente `MainLayout`.
 * Este componente define a estrutura visual principal da aplicação, que inclui
 * a barra lateral de navegação (sidebar), o cabeçalho superior (header) e a área de conteúdo principal.
 * Ele também gerencia o estado do modo de usuário (professor/aluno) e a visibilidade do menu em dispositivos móveis.
 */
const MainLayout: React.FC = () => {
  // Estado para controlar o modo de usuário atual. Inicia como 'professor'.
  const [userMode, setUserMode] = useState<UserMode>('professor');
  // Estado para controlar se o menu lateral está aberto em telas pequenas.
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Hook `useLocation` do react-router-dom para obter informações sobre a rota atual.
  // É usado para destacar o link de navegação ativo.
  const location = useLocation();

  // Função para alternar o modo do usuário entre 'professor' e 'aluno'.
  const toggleUserMode = () => {
    setUserMode(prevMode => (prevMode === 'professor' ? 'aluno' : 'professor'));
  };

  // Array de objetos que define os links da barra de navegação.
  // Facilita a renderização e manutenção dos links.
  const navLinks = [
    { path: '/', label: 'Home', icon: <IconHome /> },
    { path: '/conteudos', label: 'Explorar Aulas', icon: <IconBook /> },
    { path: '/importar', label: 'Importar', icon: <IconUpload /> },
    { path: '/professor', label: 'Painel Professor', icon: <IconLayoutDashboard /> },
    { path: '/aluno', label: 'Painel Aluno', icon: <IconUser /> },
    { path: '/config', label: 'Configurações', icon: <IconSettings /> },
  ];

  // Componente `NavLink` customizado para os itens da navegação.
  // Ele usa o `Link` do react-router e aplica estilos condicionais
  // se a sua `to` (rota) for a mesma da localização atual.
  const NavLink: React.FC<{ to: string; children: React.ReactNode; }> = ({ to, children }) => (
    <Link 
      to={to} 
      // Aplica classes de estilo dinamicamente com base na rota atual.
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${location.pathname === to ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'}`}
      // Fecha o menu móvel ao clicar em um link.
      onClick={() => setMobileMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-800">
       {/* Sidebar (Menu de Navegação Lateral) */}
       <aside className={`fixed z-20 inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out bg-indigo-900 text-white w-64 flex-shrink-0 flex flex-col`}>
        {/* Cabeçalho da Sidebar */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-indigo-800">
          <span className="text-xl font-bold">EduRoboLab</span>
          {/* Botão para fechar o menu em telas pequenas (mobile) */}
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-indigo-200 hover:text-white">
            <IconX />
          </button>
        </div>
        {/* Lista de links de navegação */}
        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map(link => (
            <NavLink key={link.path} to={link.path}>
              {link.icon}
              <span className="ml-3">{link.label}</span>
            </NavLink>
          ))}
        </nav>
        {/* Rodapé da Sidebar com o seletor de modo de usuário */}
        <div className="p-4 border-t border-indigo-800">
          <div className="flex items-center justify-center p-2 rounded-lg bg-indigo-800">
            <span className={`px-3 py-1 text-sm font-semibold rounded-md cursor-pointer ${userMode === 'professor' ? 'bg-indigo-600 text-white' : 'text-indigo-200'}`} onClick={toggleUserMode}>
              Professor
            </span>
            <span className={`px-3 py-1 text-sm font-semibold rounded-md cursor-pointer ${userMode === 'aluno' ? 'bg-indigo-600 text-white' : 'text-indigo-200'}`} onClick={toggleUserMode}>
              Aluno
            </span>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Cabeçalho Superior (Top Header) */}
        <header className="flex items-center justify-between md:justify-end h-16 bg-white dark:bg-gray-900 shadow-md px-4 md:px-6">
           {/* Botão "hambúrguer" para abrir o menu em telas pequenas */}
           <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-gray-500 dark:text-gray-400">
             <IconMenu />
           </button>
           {/* Exibição do modo de usuário atual */}
           <div className="text-gray-600 dark:text-gray-300">
            Modo: <span className="font-semibold text-indigo-600 dark:text-indigo-400 capitalize">{userMode}</span>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* O componente `Routes` define qual página será renderizada com base na URL atual. */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/conteudos" element={<ConteudosPage />} />
            <Route path="/conteudos/:id" element={<ConteudoDetailPage />} />
            <Route path="/importar" element={<ImportarPage />} />
            <Route path="/professor" element={<ProfessorPage />} />
            <Route path="/aluno" element={<AlunoPage />} />
            <Route path="/config" element={<ConfigPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
