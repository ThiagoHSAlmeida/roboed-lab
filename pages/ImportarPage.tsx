// Importa o React e o hook `useState` para gerenciar o estado do componente (passo atual, arquivo, etc.).
import React, { useState } from 'react';
// Importa a biblioteca do Google GenAI, embora esteja comentada na função mock.
import { GoogleGenAI } from "@google/genai";
// Importa ícones para a interface.
import { IconUpload, IconFile } from '../components/Icons';

/**
 * Função `processWithAI` (simulada).
 * Em uma aplicação real, esta função receberia um arquivo, enviaria seu conteúdo
 * para a API do Gemini e retornaria as extrações e sugestões.
 * Aqui, ela apenas simula esse processo com um atraso (`setTimeout`) e retorna dados fixos.
 * @param file - O arquivo a ser "processado".
 * @returns Um objeto com sugestões de metadados gerados pela IA.
 */
const processWithAI = async (file: File) => {
  console.log("Simulating AI processing for:", file.name);
  // Exemplo de como a chamada real à API poderia ser (comentado para o mock funcionar):
  // const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // const response = await ai.models.generateContent(...);
  
  // Simula um atraso de 1.5 segundos para imitar uma chamada de rede.
  await new Promise(resolve => setTimeout(resolve, 1500)); 
  
  // Retorna um objeto com dados de exemplo.
  return {
    titulo: `Título Sugerido para ${file.name.split('.').slice(0, -1).join('.')}`,
    disciplina: 'Tecnologia/Robótica',
    etapa: 'EF2',
    series: ['8º'],
    categorias: ['Programação por Blocos'],
    habilidadesBNCC: ['EF08CI02'],
    tempo: '1 aula (40-50 min)',
    formato: 'PDF',
    tags: ['ia', 'mock', 'upload'],
    resumo: 'Este é um resumo gerado pela IA (mock) com base no conteúdo do arquivo. Ele destaca os principais pontos e objetivos da aula.',
    palavrasChave: ['mock', 'simulação', 'gemini'],
  };
};

/**
 * Componente ImportarPage: Guia o usuário através de um processo de múltiplos passos (wizard)
 * para importar novos conteúdos para a plataforma.
 */
const ImportarPage: React.FC = () => {
  // Estado para controlar o passo atual do wizard (1, 2 ou 3).
  const [step, setStep] = useState(1);
  // Estado para armazenar o arquivo selecionado pelo usuário.
  const [file, setFile] = useState<File | null>(null);
  // Estado para armazenar as sugestões retornadas pela "IA".
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  // Estado para controlar a exibição do indicador de carregamento (spinner).
  const [isLoading, setIsLoading] = useState(false);

  // Função chamada quando o usuário seleciona um arquivo no input.
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Função para avançar para o próximo passo do wizard.
  const handleNextStep = async () => {
    // Lógica do Passo 1 para o 2 ou 3.
    if (step === 1 && file) {
      // Se for um arquivo de planilha, vai para o passo de mapeamento.
      if(file.type.includes('csv') || file.type.includes('sheet')){
          setStep(2);
      } else { // Se for outro tipo de arquivo (PDF, DOCX), processa com IA e pula para o passo 3.
        setIsLoading(true);
        const suggestions = await processWithAI(file);
        setAiSuggestions(suggestions);
        setIsLoading(false);
        setStep(3);
      }
    } 
    // Lógica do Passo 2 para o 3 (após mapear colunas).
    else if (step === 2) {
      setIsLoading(true);
      const suggestions = await processWithAI(file!);
      setAiSuggestions(suggestions);
      setIsLoading(false);
      setStep(3);
    }
  };

  // Função chamada ao finalizar o processo.
  const handleSave = () => {
    alert("Conteúdo salvo com sucesso! (mock)");
    // Reseta todos os estados para permitir uma nova importação.
    setStep(1);
    setFile(null);
    setAiSuggestions(null);
  }

  // Componente interno para o Passo 1: Upload do Arquivo.
  const Step1Upload: React.FC = () => (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Passo 1: Enviar Arquivo</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Selecione um arquivo CSV, XLSX, DOCX, PDF ou JSON.</p>
      <div className="mx-auto w-full max-w-lg">
        <label className="flex flex-col items-center px-4 py-12 bg-white dark:bg-gray-700 text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-600">
          <IconUpload />
          <span className="mt-2 text-base leading-normal">{file ? file.name : 'Selecione um arquivo'}</span>
          <input type='file' className="hidden" onChange={handleFileChange} accept=".csv,.xlsx,.docx,.pdf,.json" />
        </label>
      </div>
       {/* O botão "Próximo" só aparece se um arquivo foi selecionado. */}
       {file && (
        <button onClick={handleNextStep} className="mt-8 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
          Próximo
        </button>
      )}
    </div>
  );
  
  // Componente interno para o Passo 2: Mapeamento de Colunas (Placeholder).
  const Step2Mapping: React.FC = () => (
     <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Passo 2: Mapear Colunas (Wizard)</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Associe as colunas da sua planilha com os campos do sistema.</p>
        <p className="text-center text-lg bg-yellow-100 dark:bg-yellow-800 p-4 rounded-md">Esta funcionalidade é um placeholder.</p>
        <div className="flex justify-center gap-4">
            <button onClick={() => setStep(1)} className="mt-8 bg-gray-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors">
                Voltar
            </button>
            <button onClick={handleNextStep} className="mt-8 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
                Processar com IA
            </button>
        </div>
    </div>
  );

  // Componente interno para o Passo 3: Confirmação dos Dados.
  const Step3Confirm: React.FC = () => (
    <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Passo 3: Confirmar Dados</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">A IA processou o arquivo. Revise e edite as sugestões antes de salvar.</p>
        {/* Formulário com campos preenchidos com as sugestões da IA. */}
        <div className="space-y-4 max-w-2xl mx-auto">
            <InputField label="Título" defaultValue={aiSuggestions.titulo} />
            <InputField label="Disciplina" defaultValue={aiSuggestions.disciplina} />
            <InputField label="Habilidades BNCC (separadas por ;)" defaultValue={aiSuggestions.habilidadesBNCC.join(';')} />
            <TextareaField label="Resumo" defaultValue={aiSuggestions.resumo} />
        </div>
        <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => setStep(1)} className="bg-gray-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors">
                Cancelar
            </button>
            <button onClick={handleSave} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">
                Salvar Conteúdo
            </button>
        </div>
    </div>
  );

  // Componentes reutilizáveis para campos de formulário.
  const InputField: React.FC<{ label: string; defaultValue: string }> = ({ label, defaultValue }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <input type="text" defaultValue={defaultValue} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
  );
  
  const TextareaField: React.FC<{ label: string; defaultValue: string }> = ({ label, defaultValue }) => (
     <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <textarea rows={4} defaultValue={defaultValue} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-2 text-center">Importar Conteúdo</h1>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Siga os passos para adicionar novos materiais à plataforma.</p>
      
      {/* Renderização condicional: mostra o spinner de loading ou o passo atual do wizard. */}
      {isLoading ? (
         <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-lg">Processando com IA... por favor, aguarde.</p>
         </div>
      ) : (
        <>
          {step === 1 && <Step1Upload />}
          {step === 2 && <Step2Mapping />}
          {step === 3 && aiSuggestions && <Step3Confirm />}
        </>
      )}
    </div>
  );
};

export default ImportarPage;
