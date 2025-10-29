// Importações do React e de bibliotecas.
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Importa os tipos de dados e as constantes. Isso garante consistência e ajuda a evitar erros.
import { Conteudo, Etapa, Serie, Disciplina, Categoria, TipoConteudo, Formato, TempoEstimado } from '../types';
import { ETAPAS, DISCIPLINAS, CATEGORIAS, TIPOS_CONTEUDO, FORMATOS, TEMPOS_ESTIMADOS, BNCC_HABILIDADES_EXEMPLOS } from '../constants';
import { IconChevronDown } from '../components/Icons';

// Dados de exemplo (mock data) para simular o que viria de um banco de dados ou API.
// Isso permite desenvolver e testar a interface do usuário sem precisar de um backend funcional.
const mockConteudos: Conteudo[] = [
  {
    id: '1',
    titulo: 'Introdução à Eletrônica com Arduino',
    etapa: 'EF2',
    series: ['8º', '9º'],
    disciplinas: ['Tecnologia/Robótica', 'Ciências'],
    categorias: ['Eletrônica Básica', 'Programação por Blocos'],
    tipo: 'Prática',
    formato: ['PDF', 'Slide'],
    tempoEstimado: '2 aulas (80-100 min)',
    habilidadesBNCC: ['EF08CI02'],
    descricaoCurta: 'Uma aula prática para montar os primeiros circuitos e entender os componentes básicos.',
    palavrasChave: ['arduino', 'led', 'resistor'],
    arquivosIds: [],
    iaIndexacao: { topicos: [], bnccSugeridas: [], termosChave: [] },
    visibilidade: 'publico',
    autor: 'Admin',
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
  },
    {
    id: '2',
    titulo: 'Ética e Inteligência Artificial',
    etapa: 'EM',
    series: ['1º', '2º', '3º'],
    disciplinas: ['Tecnologia/Robótica', 'Projeto de Vida'],
    categorias: ['IA & Ética', 'Cidadania Digital'],
    tipo: 'Teórica',
    formato: ['Vídeo', 'Texto'],
    tempoEstimado: '1 aula (40-50 min)',
    habilidadesBNCC: ['EM13LGG102'],
    descricaoCurta: 'Discussão sobre as implicações éticas do uso de IA na sociedade.',
    palavrasChave: ['IA', 'ética', 'bias'],
    arquivosIds: [],
    iaIndexacao: { topicos: [], bnccSugeridas: [], termosChave: [] },
    visibilidade: 'publico',
    autor: 'Admin',
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
  },
];


/**
 * Componente `Accordion`: Um elemento de UI reutilizável que mostra/esconde seu conteúdo
 * quando o usuário clica no título. Ideal para construir a barra de filtros.
 * @param title - O título visível do accordion.
 * @param children - O conteúdo a ser exibido quando o accordion está aberto.
 */
const Accordion: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  // Estado para controlar se o accordion está aberto ou fechado.
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-3 text-left font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
        <span>{title}</span>
        {/* O ícone de seta pode girar com base no estado `isOpen` (não implementado aqui, mas possível com CSS). */}
        <IconChevronDown />
      </button>
      {/* Renderização condicional: o conteúdo só é exibido se `isOpen` for verdadeiro. */}
      {isOpen && <div className="p-3 bg-gray-50 dark:bg-gray-700">{children}</div>}
    </div>
  );
};

/**
 * Componente `ConteudosPage`: A página principal para explorar e filtrar o catálogo de aulas.
 */
const ConteudosPage: React.FC = () => {
  // Estado para armazenar a lista de todos os conteúdos. Inicializado com os dados mock.
  const [conteudos] = useState<Conteudo[]>(mockConteudos);
  // Estado para armazenar os filtros ativos. É um objeto onde cada chave é um critério de filtro (ex: 'etapa')
  // e o valor é um array com os valores selecionados (ex: ['EF2']).
  const [filters, setFilters] = useState<any>({});

  /**
   * Função para manipular a mudança de um filtro.
   * Lida com a lógica de adicionar ou remover um valor de um filtro de múltipla seleção.
   * @param key - A chave do filtro (ex: 'disciplina').
   * @param value - O valor a ser adicionado/removido (ex: 'Matemática').
   */
  const handleFilterChange = <T,>(key: string, value: T) => {
    setFilters((prev: any) => {
      const currentValues = prev[key] || [];
      // Se o valor já está no array, remove-o (desmarcou o checkbox).
      if (currentValues.includes(value)) {
        return { ...prev, [key]: currentValues.filter((v: T) => v !== value) };
      } 
      // Se não está, adiciona-o (marcou o checkbox).
      else {
        return { ...prev, [key]: [...currentValues, value] };
      }
    });
  };

  /**
   * `useMemo` é um hook de otimização.
   * A lógica de filtragem dentro dele só será re-executada se `conteudos` ou `filters` mudarem.
   * Isso evita recálculos desnecessários a cada re-renderização do componente, melhorando a performance.
   */
  const filteredConteudos = useMemo(() => {
    return conteudos.filter(c => {
      // Para cada filtro, verifica se o conteúdo atende ao critério. Se não, retorna `false` e o item é removido.
      if (filters.etapa?.length && !filters.etapa.includes(c.etapa)) return false;
      if (filters.serie?.length && !c.series.some(s => filters.serie.includes(s))) return false;
      if (filters.disciplina?.length && !c.disciplinas.some(d => filters.disciplina.includes(d))) return false;
      if (filters.categoria?.length && !c.categorias.some(cat => filters.categoria.includes(cat))) return false;
      if (filters.bncc?.length && !c.habilidadesBNCC.some(b => filters.bncc.includes(b))) return false;
      // Se passou por todas as verificações, o conteúdo é mantido.
      return true;
    });
  }, [conteudos, filters]);


  /**
   * Componente interno `FilterSidebar`: Renderiza a barra lateral com todas as opções de filtro.
   */
  const FilterSidebar = () => (
    <aside className="w-full md:w-80 lg:w-96 flex-shrink-0 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Filtros</h2>
        <div className="space-y-4">
            {/* Usa o componente Accordion para cada seção de filtro. */}
            <Accordion title="Etapa e Série">
                {/* Mapeia as etapas e séries a partir das constantes. */}
                {Object.keys(ETAPAS).map((etapa) => (
                    <div key={etapa}>
                        <label className="flex items-center space-x-2 font-semibold">
                            <input type="checkbox" className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500" onChange={() => handleFilterChange('etapa', etapa)} />
                            <span>{etapa === 'EF2' ? 'Ensino Fundamental II' : 'Ensino Médio'}</span>
                        </label>
                        <div className="ml-6 mt-2 space-y-1">
                            {ETAPAS[etapa as Etapa].map(serie => (
                                <label key={serie} className="flex items-center space-x-2 text-sm">
                                    <input type="checkbox" className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500" onChange={() => handleFilterChange('serie', serie)} />
                                    <span>{serie} Ano</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </Accordion>
            {/* ... outros accordions para Disciplina, Categoria, BNCC ... */}
            <Accordion title="Disciplina">
                <div className="space-y-1 max-h-48 overflow-y-auto">
                    {DISCIPLINAS.map(d => (
                        <label key={d} className="flex items-center space-x-2 text-sm">
                            <input type="checkbox" className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500" onChange={() => handleFilterChange('disciplina', d)} />
                            <span>{d}</span>
                        </label>
                    ))}
                </div>
            </Accordion>
            <Accordion title="Categoria">
                 <div className="space-y-1 max-h-48 overflow-y-auto">
                    {CATEGORIAS.map(c => (
                        <label key={c} className="flex items-center space-x-2 text-sm">
                            <input type="checkbox" className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500" onChange={() => handleFilterChange('categoria', c)} />
                            <span>{c}</span>
                        </label>
                    ))}
                </div>
            </Accordion>
            <Accordion title="Habilidades BNCC">
                 <div className="space-y-1 max-h-48 overflow-y-auto">
                    {BNCC_HABILIDADES_EXEMPLOS.map(h => (
                        <label key={h.codigo} className="flex items-center space-x-2 text-sm">
                            <input type="checkbox" className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500" onChange={() => handleFilterChange('bncc', h.codigo)} />
                            <span>{h.codigo}</span>
                        </label>
                    ))}
                </div>
            </Accordion>
        </div>
    </aside>
  );

  /**
   * Componente interno `ContentCard`: Renderiza um card individual para um item de conteúdo.
   * @param conteudo - O objeto de conteúdo a ser exibido.
   */
  const ContentCard: React.FC<{ conteudo: Conteudo }> = ({ conteudo }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
        <div className="p-6 flex-grow">
            <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{conteudo.titulo}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{conteudo.descricaoCurta}</p>
            <div className="mt-4 space-y-2 text-sm">
                <p><strong>Etapa/Série:</strong> {conteudo.etapa} / {conteudo.series.join(', ')}</p>
                <p><strong>Disciplina:</strong> {conteudo.disciplinas.join(', ')}</p>
                <p><strong>Tempo:</strong> {conteudo.tempoEstimado}</p>
            </div>
            {/* Exibe as categorias e habilidades BNCC como "chips" (tags). */}
            <div className="mt-4 flex flex-wrap gap-2">
                {conteudo.categorias.slice(0, 2).map(cat => <span key={cat} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{cat}</span>)}
                {conteudo.habilidadesBNCC.slice(0, 2).map(bncc => <span key={bncc} className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800">{bncc}</span>)}
            </div>
        </div>
        {/* Rodapé do card com o botão para ver detalhes. */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
            <Link to={`/conteudos/${conteudo.id}`} className="w-full text-center inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300">
                Detalhes
            </Link>
        </div>
    </div>
  );

  // Estrutura principal da página.
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <FilterSidebar />
      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Catálogo de Aulas e Projetos</h1>
        {/* Renderização condicional: mostra os cards se houver resultados, ou uma mensagem de "não encontrado" caso contrário. */}
        {filteredConteudos.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Mapeia os conteúdos filtrados para renderizar um ContentCard para cada um. */}
            {filteredConteudos.map(c => <ContentCard key={c.id} conteudo={c} />)}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-xl text-gray-500">Nenhum conteúdo encontrado com os filtros selecionados.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ConteudosPage;
