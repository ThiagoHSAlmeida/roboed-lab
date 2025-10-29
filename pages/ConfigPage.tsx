// Importa o React e o hook `useRef` para interagir com elementos do DOM diretamente.
import React, { useRef } from 'react';
// Importa ícones para os botões de ação.
import { IconDownload, IconUpload, IconTrash } from '../components/Icons';

/**
 * Componente ConfigPage: Permite ao usuário configurar preferências da aplicação
 * e gerenciar os dados locais, como exportar/importar backups e limpar o cache.
 */
const ConfigPage: React.FC = () => {
    // `useRef` é usado para criar uma referência a um elemento do DOM.
    // Aqui, ele se conecta ao input de arquivo, que está escondido, para que possamos
    // acionar o clique nele a partir de um botão mais estilizado.
    const fileInputRef = useRef<HTMLInputElement>(null);

    /**
     * Função `handleExport`: Gera um arquivo JSON com dados mock e inicia o download.
     */
    const handleExport = () => {
        // Em uma aplicação real, estes dados viriam do estado global (Context, Redux, Zustand)
        // ou de um banco de dados local como IndexedDB.
        const mockData = {
            conteudos: [{ id: '1', titulo: 'Aula Mock 1' }],
            trilhas: [{ id: 't1', titulo: 'Trilha Mock 1' }],
            config: { user: 'professor' }
        };

        // 1. Converte o objeto JavaScript em uma string JSON formatada.
        // 2. Cria uma URL de dados (Data URL) que contém o JSON.
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(mockData, null, 2))}`;
        
        // 3. Cria um elemento de link `<a>` invisível.
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `edurobolab_backup_${new Date().toISOString().split('T')[0]}.json`; // Define o nome do arquivo.
        
        // 4. Simula um clique no link para iniciar o download e o remove em seguida.
        link.click();
        alert('Backup exportado com sucesso!');
    };

    /**
     * Função `handleImportClick`: Aciona o clique no input de arquivo escondido.
     */
    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    /**
     * Função `handleFileChange`: É chamada quando o usuário seleciona um arquivo no input.
     * Lê o arquivo selecionado e processa seu conteúdo.
     */
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Usa a API `FileReader` do navegador para ler o conteúdo do arquivo.
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const text = e.target?.result;
                    if (typeof text === 'string') {
                        // Converte o texto do arquivo (que deve ser JSON) em um objeto JavaScript.
                        const jsonData = JSON.parse(text);
                        // Em uma aplicação real, você despacharia uma ação para atualizar seu estado global com `jsonData`.
                        console.log("Imported data:", jsonData);
                        alert('Backup importado com sucesso! (Verifique o console)');
                    }
                } catch (error) {
                    alert('Erro ao ler o arquivo de backup. Verifique se o formato é JSON válido.');
                    console.error("Import error:", error);
                }
            };
            // Inicia a leitura do arquivo como texto.
            reader.readAsText(file);
        }
    };
    
    /**
     * Função `handleClearCache`: Limpa os dados armazenados localmente no navegador.
     */
    const handleClearCache = () => {
        // `window.confirm` mostra um diálogo de confirmação para evitar ações destrutivas acidentais.
        if (window.confirm("Tem certeza que deseja limpar todos os dados locais? Esta ação não pode ser desfeita.")) {
            // Em uma aplicação real, aqui você limparia o localStorage, sessionStorage, IndexedDB, etc.
            localStorage.clear();
            alert("Cache e dados locais foram limpos.");
            window.location.reload(); // Recarrega a página para refletir o estado limpo.
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header>
                <h1 className="text-4xl font-bold">Configurações</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Gerencie as preferências e dados da aplicação.</p>
            </header>

            {/* Seção de Acessibilidade (Placeholder) */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 border-b pb-2">Acessibilidade</h2>
                <div className="space-y-4">
                    {/* Switch para Alto Contraste */}
                    <div className="flex items-center justify-between">
                        <label htmlFor="high-contrast" className="font-medium">Alto Contraste</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="high-contrast" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                     {/* Seletor para Tamanho da Fonte */}
                     <div className="flex items-center justify-between">
                        <label htmlFor="font-size" className="font-medium">Tamanho da Fonte</label>
                        <select id="font-size" className="p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600">
                            <option>Padrão</option>
                            <option>Médio</option>
                            <option>Grande</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Seção de Gerenciamento de Dados */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 border-b pb-2">Dados da Aplicação</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <button onClick={handleExport} className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                        <IconDownload /><span className="ml-2 font-semibold">Exportar Backup (JSON)</span>
                    </button>
                    <button onClick={handleImportClick} className="flex items-center justify-center p-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors">
                        <IconUpload /><span className="ml-2 font-semibold">Importar Backup (JSON)</span>
                        {/* O input de arquivo real. Ele está escondido (`hidden`), mas funcional. */}
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".json" />
                    </button>
                    <button onClick={handleClearCache} className="flex items-center justify-center p-4 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors">
                        <IconTrash /><span className="ml-2 font-semibold">Limpar Cache Local</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfigPage;
