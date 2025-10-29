// Importa o React e o hook `useState` para gerenciar o estado da aba ativa.
import React, { useState } from 'react';
// Importa o hook `useParams` do `react-router-dom` para acessar os parâmetros da URL, como o ID do conteúdo.
import { useParams } from 'react-router-dom';
// Importa o tipo `Conteudo` para garantir que os dados do mock estejam corretos.
import { Conteudo } from '../types';

// Dados de exemplo (mock data) para um único conteúdo.
// Em uma aplicação real, você usaria o `id` da URL para buscar esses dados de uma API ou de um estado global.
const mockConteudo: Conteudo = {
    id: '1',
    titulo: 'Introdução à Eletrônica com Arduino',
    etapa: 'EF2',
    series: ['8º', '9º'],
    disciplinas: ['Tecnologia/Robótica', 'Ciências'],
    categorias: ['Eletrônica Básica', 'Programação por Blocos'],
    tipo: 'Prática',
    formato: ['PDF', 'Slide'],
    tempoEstimado: '2 aulas (80-100 min)',
    habilidadesBNCC: ['EF08CI02', 'EM13CNT101'],
    descricaoCurta: 'Uma aula prática para montar os primeiros circuitos e entender os componentes básicos.',
    palavrasChave: ['arduino', 'led', 'resistor', 'circuito'],
    arquivosIds: ['file1', 'file2'],
    iaIndexacao: {
      topicos: ["Circuitos Elétricos", "Componentes Básicos", "Programação Arduino"],
      bnccSugeridas: ["EF08CI02", "EF09CI08"],
      termosChave: ["Arduino", "LED", "Resistor", "Protoboard", "Lógica de programação"]
    },
    visibilidade: 'publico',
    autor: 'Prof. Exemplo',
    criadoEm: new Date('2023-10-26T10:00:00Z').toISOString(),
    atualizadoEm: new Date('2023-10-27T15:30:00Z').toISOString(),
};

// Define um tipo para as abas disponíveis, garantindo que só possamos usar valores válidos.
type Tab = 'metadados' | 'arquivos' | 'estrutura' | 'pre-aula' | 'notas';

/**
 * Componente ConteudoDetailPage: Exibe os detalhes completos de uma aula ou projeto.
 */
const ConteudoDetailPage: React.FC = () => {
  // O hook `useParams` extrai o `id` da URL. Ex: se a URL for `/conteudos/1`, `id` será "1".
  const { id } = useParams();
  // Estado para armazenar os dados do conteúdo. Inicializado com o mock.
  // Em uma aplicação real, você teria um `useEffect` aqui para buscar os dados usando o `id`.
  const [conteudo] = useState<Conteudo>(mockConteudo);
  // Estado para controlar qual aba está atualmente ativa.
  const [activeTab, setActiveTab] = useState<Tab>('metadados');

  // Se, por algum motivo, o conteúdo não for encontrado, exibe uma mensagem.
  if (!conteudo) {
    return <div>Conteúdo não encontrado.</div>;
  }
  
  /**
   * Função que renderiza o conteúdo da aba ativa.
   * Usa uma estrutura `switch` para retornar o JSX apropriado com base no valor de `activeTab`.
   */
  const renderTabContent = () => {
    switch(activeTab) {
      case 'metadados':
        return (
          <div className="space-y-4">
            <p><strong>Descrição:</strong> {conteudo.descricaoCurta}</p>
            <p><strong>Etapa:</strong> {conteudo.etapa}</p>
            <p><strong>Séries:</strong> {conteudo.series.join(', ')}</p>
            <p><strong>Disciplinas:</strong> {conteudo.disciplinas.join(', ')}</p>
            <p><strong>Categorias:</strong> {conteudo.categorias.join(', ')}</p>
            <p><strong>Habilidades BNCC:</strong> {conteudo.habilidadesBNCC.join(', ')}</p>
            <p><strong>Palavras-chave:</strong> {conteudo.palavrasChave.join(', ')}</p>
          </div>
        );
      // As outras abas são placeholders por enquanto.
      case 'arquivos':
        return <div>Arquivos Anexados (Placeholder)</div>;
      case 'estrutura':
        return <div>Estrutura / Sumário (Placeholder)</div>;
      case 'pre-aula':
        return <div>Pré-aula por disciplina (Placeholder)</div>;
      case 'notas':
        return <div>Notas do Professor (Placeholder)</div>;
      default:
        return null;
    }
  };

  /**
   * Componente interno `TabButton`: Um botão reutilizável para a navegação por abas.
   * Ele muda de estilo se a sua `tabId` for a mesma que a `activeTab` do estado.
   */
  const TabButton: React.FC<{ tabId: Tab, label: string }> = ({ tabId, label }) => (
    <button 
      onClick={() => setActiveTab(tabId)}
      // Aplica classes de estilo condicionalmente para destacar a aba ativa.
      className={`px-4 py-2 font-semibold border-b-2 transition-colors duration-300 ${activeTab === tabId ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
      {/* Cabeçalho com o título e metadados como autor e datas. */}
      <header className="border-b pb-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{conteudo.titulo}</h1>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span><strong>Autor:</strong> {conteudo.autor}</span>
          <span><strong>Criado em:</strong> {new Date(conteudo.criadoEm).toLocaleDateString('pt-BR')}</span>
          <span><strong>Atualizado em:</strong> {new Date(conteudo.atualizadoEm).toLocaleDateString('pt-BR')}</span>
        </div>
      </header>

      {/* Layout principal da página, dividido em conteúdo principal e uma barra lateral. */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Área de conteúdo principal com as abas */}
        <div className="lg:w-2/3">
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                <TabButton tabId="metadados" label="Metadados" />
                <TabButton tabId="arquivos" label="Arquivos" />
                <TabButton tabId="estrutura" label="Estrutura" />
                <TabButton tabId="pre-aula" label="Pré-aula" />
                <TabButton tabId="notas" label="Notas do Professor" />
              </nav>
          </div>
          {/* O conteúdo da aba selecionada é renderizado aqui. */}
          <div className="min-h-[200px]">
            {renderTabContent()}
          </div>
        </div>

        {/* Barra lateral (aside) para mostrar informações geradas pela IA. */}
        <aside className="lg:w-1/3 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Indexação por IA</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold">Tópicos Extraídos:</h3>
                    <ul className="list-disc list-inside text-sm">
                        {conteudo.iaIndexacao.topicos.map(t => <li key={t}>{t}</li>)}
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">BNCC Sugerida:</h3>
                     <ul className="list-disc list-inside text-sm">
                        {conteudo.iaIndexacao.bnccSugeridas.map(b => <li key={b}>{b}</li>)}
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold">Termos Chave:</h3>
                     <div className="flex flex-wrap gap-2 mt-2">
                        {conteudo.iaIndexacao.termosChave.map(t => <span key={t} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-600 dark:text-gray-300">{t}</span>)}
                    </div>
                </div>
            </div>
            {/* Botões de ação */}
            <div className="mt-6 flex flex-col space-y-3">
              <button className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition-colors">Editar Metadados</button>
              <button className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors">Anexar Arquivo</button>
            </div>
        </aside>

      </div>
    </div>
  );
};

export default ConteudoDetailPage;
