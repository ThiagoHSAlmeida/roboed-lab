// Importa o React e os componentes de ícones.
import React from 'react';
import { IconPlus, IconDownload, IconFile } from '../components/Icons';

/**
 * Componente ProfessorPage: Um painel de controle (dashboard) para o modo "Professor".
 * Esta página é um "mock", o que significa que ela exibe uma interface estática com dados de exemplo
 * para simular como a página real funcionaria. A lógica de negócio (criar trilhas, exportar relatórios)
 * não está implementada.
 */
const ProfessorPage: React.FC = () => {
  // Dados de exemplo para a tabela "Conteúdos por Série".
  const conteudosPorSerie = [
    { serie: '6º Ano', total: 5, novos: 2, bncc: '65%' },
    { serie: '7º Ano', total: 8, novos: 1, bncc: '80%' },
    { serie: '8º Ano', total: 12, novos: 5, bncc: '90%' },
    { serie: '9º Ano', total: 7, novos: 0, bncc: '75%' },
  ];

  // Dados de exemplo para a tabela "Cobertura BNCC por Turma".
  const coberturaBNCC = [
    { turma: 'Turma A - 8º Ano', cobertura: '85%', aulas: 10, alunos: 25 },
    { turma: 'Turma B - 8º Ano', cobertura: '70%', aulas: 8, alunos: 22 },
  ];

  return (
    // Container principal com espaçamento vertical entre as seções.
    <div className="space-y-8">
      {/* Cabeçalho da página. */}
      <header>
        <h1 className="text-4xl font-bold">Painel do Professor</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Gerencie suas aulas, trilhas e acompanhe a cobertura curricular.</p>
      </header>

      {/* Grade de botões de ação rápida. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="flex items-center justify-center p-6 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
          <IconPlus /><span className="ml-2 font-semibold">Criar Trilha de Aprendizagem</span>
        </button>
        <button className="flex items-center justify-center p-6 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors">
          <IconFile /><span className="ml-2 font-semibold">Organizar Conteúdos</span>
        </button>
        <button className="flex items-center justify-center p-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors">
          <IconDownload /><span className="ml-2 font-semibold">Exportar Relatório (JSON/CSV)</span>
        </button>
      </div>

      {/* Card com a tabela "Conteúdos por Série". */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Conteúdos por Série</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Série</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total de Conteúdos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Novos na Semana</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cobertura BNCC</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {/* Mapeia os dados do array `conteudosPorSerie` para criar as linhas da tabela. */}
              {conteudosPorSerie.map(item => (
                <tr key={item.serie}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{item.serie}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.novos}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-600 dark:text-green-400">{item.bncc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
       {/* Card com a tabela "Cobertura BNCC por Turma". */}
       <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Cobertura BNCC por Turma</h2>
         <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Turma</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cobertura</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aulas Atribuídas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Alunos</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {/* Mapeia os dados do array `coberturaBNCC` para criar as linhas da tabela. */}
              {coberturaBNCC.map(item => (
                <tr key={item.turma}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{item.turma}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-indigo-600 dark:text-indigo-400">{item.cobertura}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.aulas}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.alunos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ProfessorPage;
