// Importa as bibliotecas React e ReactDOM, que são essenciais para construir a interface do usuário e renderizá-la no navegador.
import React from 'react';
import ReactDOM from 'react-dom/client';
// Importa o componente principal da aplicação, chamado 'App'. É a partir dele que todos os outros componentes serão aninhados.
import App from './App';

/**
 * Ponto de entrada (entry point) da aplicação React.
 * O código aqui é o primeiro a ser executado no lado do cliente (no navegador).
 */

// 1. Busca o elemento HTML com o id 'root' no arquivo index.html.
// Este elemento servirá como o contêiner principal onde toda a aplicação será renderizada.
const rootElement = document.getElementById('root');

// 2. Verifica se o elemento 'root' foi realmente encontrado no DOM.
// Se não for encontrado, lança um erro para alertar o desenvolvedor, pois a aplicação não pode iniciar sem ele.
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// 3. Cria a "raiz" de renderização do React associada ao elemento HTML encontrado.
// Esta é a maneira moderna de iniciar uma aplicação React (a partir do React 18).
const root = ReactDOM.createRoot(rootElement);

// 4. Renderiza o componente principal <App /> dentro da raiz.
// O <React.StrictMode> é um invólucro que ajuda a identificar potenciais problemas na aplicação durante o desenvolvimento.
// Ele ativa verificações e avisos adicionais, mas não afeta a aplicação em produção.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
