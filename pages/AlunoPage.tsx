// Importa o React para criar o componente.
import React from 'react';

/**
 * Componente AlunoPage: Um painel de controle (dashboard) para o modo "Aluno".
 * Assim como a página do professor, esta é uma versão "mock" (simulada) para demonstrar
 * a aparência e a estrutura da interface, sem funcionalidade real de progresso ou
 * carregamento de dados.
 */
const AlunoPage: React.FC = () => {
    // Dados de exemplo para as trilhas de aprendizagem do aluno.
    // Em uma aplicação real, esses dados viriam de um banco de dados e seriam
    // específicos para o aluno logado.
    const trilhas = [
        { id: 1, titulo: 'Trilha de Introdução ao Arduino', progresso: 25, serie: '8º Ano' },
        { id: 2, titulo: 'Lógica de Programação com Blocos', progresso: 60, serie: '8º Ano' },
        { id: 3, titulo: 'Fundamentos de Cidadania Digital', progresso: 0, serie: '8º Ano' },
    ];

    return (
        // Container principal com espaçamento vertical entre as seções.
        <div className="space-y-8">
            {/* Cabeçalho da página */}
            <header>
                <h1 className="text-4xl font-bold">Painel do Aluno</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Acompanhe suas trilhas de aprendizagem e explore os conteúdos disponíveis.</p>
            </header>

            {/* Card principal com a lista de trilhas do aluno */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Minhas Trilhas - 8º Ano</h2>
                <div className="space-y-4">
                    {/*
                      Usa o método `.map()` para iterar sobre o array `trilhas` e renderizar
                      um bloco de UI para cada trilha. A `key` é fundamental para o React.
                    */}
                    {trilhas.map(trilha => (
                        <div key={trilha.id} className="p-4 border dark:border-gray-700 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold text-lg">{trilha.titulo}</h3>
                                <span className="font-bold text-indigo-600 dark:text-indigo-400">{trilha.progresso}%</span>
                            </div>
                            {/* Barra de Progresso */}
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                {/* A largura da barra interna é definida dinamicamente com base no `trilha.progresso`. */}
                                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${trilha.progresso}%` }}></div>
                            </div>
                            <button className="mt-4 text-sm font-semibold text-indigo-600 hover:underline">
                                Continuar Trilha
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Seção de placeholder para conteúdos futuros */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
                 <h2 className="text-2xl font-bold mb-4">Conteúdos Visíveis por Série</h2>
                 <p className="text-center text-lg bg-yellow-100 dark:bg-yellow-800 p-4 rounded-md">
                    Esta área mostrará os conteúdos habilitados pelo professor. (Placeholder)
                 </p>
            </div>
        </div>
    );
};

export default AlunoPage;
