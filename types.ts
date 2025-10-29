/**
 * Este arquivo centraliza todas as definições de tipos e interfaces TypeScript da aplicação.
 * Usar TypeScript ajuda a evitar erros comuns, melhora o autocompletar do editor de código
 * e torna o código mais legível e fácil de manter, pois define claramente a "forma" dos dados.
 */

// Tipos de União (Union Types): Definem um tipo que pode ser um de vários valores possíveis.
// Isso garante que apenas valores válidos sejam usados em variáveis e propriedades.

export type Etapa = "EF2" | "EM"; // Ensino Fundamental II ou Ensino Médio
export type Serie = "6º" | "7º" | "8º" | "9º" | "1º" | "2º" | "3º";
export type Disciplina = "Tecnologia/Robótica" | "Matemática" | "Ciências" | "Física" | "Química" | "Biologia" | "Geografia" | "História" | "Língua Portuguesa" | "Inglês" | "Artes" | "Projeto de Vida";
export type Categoria = "Eletrônica Básica" | "Sensores" | "Programação por Blocos" | "Algoritmos & Lógica" | "IA & Ética" | "Cidadania Digital" | "Segurança de Dados" | "Interdisciplinar" | "Avaliação" | "Guia do Professor" | "Simuladores";
export type TipoConteudo = "Teórica" | "Prática" | "Interdisciplinar" | "Avaliação" | "Guia do Professor";
export type Formato = "Texto" | "PDF" | "Planilha" | "Slide" | "Vídeo" | "Simulador" | "Link Externo";
export type TempoEstimado = "1 aula (40-50 min)" | "2 aulas (80-100 min)" | ">2 aulas";

/**
 * Interface `Conteudo`:
 * Representa a estrutura de dados principal para uma aula ou projeto.
 * É o "coração" do modelo de dados da aplicação.
 */
export interface Conteudo {
  id: string; // Identificador único
  titulo: string;
  etapa: Etapa; // EF2 ou EM
  series: Serie[]; // Pode ser aplicado a múltiplas séries (ex: 8º e 9º ano)
  disciplinas: Disciplina[]; // Pode ser interdisciplinar
  categorias: Categoria[]; // Tags para organização
  tipo: TipoConteudo; // Natureza do conteúdo (teórico, prático, etc.)
  formato: Formato[]; // Formatos de mídia disponíveis
  tempoEstimado: TempoEstimado;
  habilidadesBNCC: string[]; // Lista de códigos das habilidades (ex: "EF08CI02")
  descricaoCurta: string;
  palavrasChave: string[];
  arquivosIds: string[]; // IDs dos arquivos associados a este conteúdo
  iaIndexacao: { // Dados gerados pela IA para busca e análise
    topicos: string[];
    bnccSugeridas: string[];
    termosChave: string[];
  };
  visibilidade: "publico" | "privado";
  autor: string;
  criadoEm: string; // Data em formato ISO (ex: "2023-10-27T10:00:00.000Z")
  atualizadoEm: string; // Data em formato ISO
}

/**
 * Interface `Arquivo`:
 * Representa um arquivo físico (PDF, DOCX, etc.) ou link associado a um `Conteudo`.
 */
export interface Arquivo {
  id: string; // Identificador único do arquivo
  conteudoId: string; // ID do `Conteudo` ao qual este arquivo pertence
  nomeOriginal: string; // Nome do arquivo no momento do upload
  tipo: "csv" | "xlsx" | "docx" | "pdf" | "json" | "mp4" | "link";
  tamanhoBytes: number;
  urlLocal: string | null; // Caminho para o arquivo se armazenado localmente (ex: IndexedDB)
  metadados?: { // Metadados específicos do tipo de arquivo
    planilha?: {
      aba: string | null;
      mapeamentoColunas: Record<string, string>; // Mapeia coluna 'A' para 'titulo', etc.
      linhasProcessadas: number;
    };
    texto?: {
      paginas: number;
      palavras: number;
    };
  };
  iaResumo: string; // Resumo do conteúdo do arquivo gerado por IA
  iaPalavrasChave: string[]; // Palavras-chave extraídas por IA
  armazenamento: "indexeddb" | "filesystem" | "externo"; // Onde o arquivo está guardado
}

/**
 * Interface `Trilha`:
 * Representa uma sequência ordenada de `Conteudo` para formar uma trilha de aprendizagem.
 */
export interface Trilha {
  id: string;
  titulo: string;
  descricao: string;
  etapa: Etapa;
  series: Serie[];
  disciplinas: Disciplina[];
  itens: { conteudoId: string; ordem: number }[]; // Lista de conteúdos e sua ordem na trilha
  bnccAlvos: string[]; // Habilidades BNCC que esta trilha visa cobrir
}

/**
 * Interface `BNCC_Habilidade`:
 * Representa a estrutura de uma habilidade da Base Nacional Comum Curricular.
 */
export interface BNCC_Habilidade {
  codigo: string; // Ex: "EF06MA01"
  etapa: Etapa;
  area: "Matemática" | "Linguagens" | "Ciências da Natureza" | "Ciências Humanas";
  descricao: string;
}
