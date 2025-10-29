// Importa os tipos definidos no arquivo `types.ts`.
// Isso garante que nossas constantes sigam a estrutura de dados correta, evitando erros.
// FIX: Added 'Etapa' to the import list to resolve a type error.
import { Etapa, Serie, Disciplina, Categoria, TipoConteudo, Formato, TempoEstimado, BNCC_Habilidade } from './types';

/**
 * Este arquivo define constantes que são usadas em toda a aplicação.
 * Centralizar esses dados aqui torna o código mais fácil de manter. Se precisarmos
 * adicionar uma nova disciplina, por exemplo, só precisamos modificar este arquivo.
 * São usados principalmente para popular menus de seleção (dropdowns), caixas de seleção (checkboxes) e filtros.
 */

// Mapeia as etapas de ensino (EF2, EM) para suas respectivas séries.
// Útil para criar filtros dependentes, onde a seleção da etapa atualiza as séries disponíveis.
export const ETAPAS: { [key in Etapa]: Serie[] } = {
  EF2: ["6º", "7º", "8º", "9º"],
  EM: ["1º", "2º", "3º"],
};

// Lista de todas as disciplinas disponíveis na plataforma.
export const DISCIPLINAS: Disciplina[] = [
  "Tecnologia/Robótica", "Matemática", "Ciências", "Física", "Química", "Biologia",
  "Geografia", "História", "Língua Portuguesa", "Inglês", "Artes", "Projeto de Vida"
];

// Lista de categorias para classificar os conteúdos.
export const CATEGORIAS: Categoria[] = [
  "Eletrônica Básica", "Sensores", "Programação por Blocos", "Algoritmos & Lógica", "IA & Ética",
  "Cidadania Digital", "Segurança de Dados", "Interdisciplinar", "Avaliação", "Guia do Professor", "Simuladores"
];

// Lista dos tipos de conteúdo.
export const TIPOS_CONTEUDO: TipoConteudo[] = [
  "Teórica", "Prática", "Interdisciplinar", "Avaliação", "Guia do Professor"
];

// Lista dos formatos de mídia que um conteúdo pode ter.
export const FORMATOS: Formato[] = [
  "Texto", "PDF", "Planilha", "Slide", "Vídeo", "Simulador", "Link Externo"
];

// Opções para o tempo estimado de duração de uma aula/projeto.
export const TEMPOS_ESTIMADOS: TempoEstimado[] = [
  "1 aula (40-50 min)", "2 aulas (80-100 min)", ">2 aulas"
];

// Uma lista de exemplos de habilidades da BNCC para fins de demonstração e teste.
// Em uma aplicação real, essa lista seria muito maior e poderia vir de um banco de dados
// ou ser importada de um arquivo.
export const BNCC_HABILIDADES_EXEMPLOS: BNCC_Habilidade[] = [
  { codigo: "EF06MA01", etapa: "EF2", area: "Matemática", descricao: "Comparar, ordenar, ler e escrever números naturais e números racionais em sua representação decimal..." },
  { codigo: "EF07MA02", etapa: "EF2", area: "Matemática", descricao: "Resolver e elaborar problemas que envolvam porcentagens, como os que lidam com acréscimos e decréscimos simples..." },
  { codigo: "EF08CI02", etapa: "EF2", area: "Ciências da Natureza", descricao: "Construir circuitos elétricos com pilha/bateria, fios e lâmpada ou outros dispositivos..." },
  { codigo: "EF09CI08", etapa: "EF2", area: "Ciências da Natureza", descricao: "Discutir o papel do avanço tecnológico na aplicação das leis da Física para o desenvolvimento de máquinas..." },
  { codigo: "EF09LP01", etapa: "EF2", area: "Linguagens", descricao: "Analisar o fenômeno da desinformação, compreendendo como ele se manifesta na sociedade contemporânea..." },
  { codigo: "EM13CNT101", etapa: "EM", area: "Ciências da Natureza", descricao: "Analisar e representar, com ou sem o uso de dispositivos e de aplicativos digitais..." },
  { codigo: "EM13CNT203", etapa: "EM", area: "Ciências da Natureza", descricao: "Avaliar e prever efeitos de intervenções nos ecossistemas, e seus impactos nos seres vivos e no corpo humano..." },
  { codigo: "EM13LGG102", etapa: "EM", area: "Linguagens", descricao: "Analisar visões de mundo, conflitos de interesse, preconceitos e ideologias presentes nos discursos..." },
];