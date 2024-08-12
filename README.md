# Aplicação de Favoritos de Rick & Morty
<p align="center">
    <img src="https://mottu-jordanio.netlify.app//assets/img/logo/logo.svg" width="150" style="margin-left: 48px" />
</p>
<table align="center" border="0">
  <tr border="0">
    <td border="0"><img src="https://mottu.com.br/wp-content/uploads/2022/02/Mottu-grupo-verde-horizontal.png" width="150" /></td>
    <td border="0"><img src="https://i.ibb.co/SPGby68/jordanio.png" width="150" /></td>
  </tr>
</table>

## Visão Geral

Este projeto é um desafio lançado pela mottu que consiste em uma aplicação front-end para busca, visualização e gerenciamento dos seus personagens favoritos da série Rick & Morty. Utiliza a API pública [Rick and Morty API](https://rickandmortyapi.com/) para buscar dados dos personagens e oferece uma interface amigável para gerenciar os favoritos.

## Funcionalidades
- **Busca de Personagens:** Busque personagens pelo nome.
- **Detalhes dos Personagens:** Veja informações básicas sobre os personagens, incluindo nome, gênero e imagem.
- **Gerenciamento de Favoritos:** Adicione e remova personagens da sua lista de favoritos a partir de estado global gerenciado por Subjects.
- **Lista de favoritos:** Lista contendo todos os favoritos.
- **Contador Dinâmico:** Atualização em tempo real do número de personagens favoritos na navbar.
- **Design Responsivo:** Otimizado para vários tamanhos de tela.
- **Internacionalização:** Suporte para múltiplos idiomas.
- **Carregamento Preguiçoso:** Carregamento eficiente dos módulos de página.
- **Buscador otimizado:** Campo de input otimizado com operadores RxJs
- **Fontes personalizadas:** Adição de fontes personalizadas


## Funcionalidades adicionais
Afim de trazer uma melhor usabilidade foram adicionados pequenas features e são elas:
- **Filtro nos favoritos:** Permitir que o usuário possa filtrar os personagems favoritos.
- **Limpar favoritos:** Permitir que o usuário exclua todos os favoritos de uma vez.
- **Scroll infinito:** Ao chegar ao fim da página, se houver mais registros ou próximas páginas o sistema carrega sozinho.

## Tecnologias Utilizadas

- **Framework:** Angular 13+
- **Gerenciamento de Estado:** NgRx, RxJs
- **Linguagem:** TypeScript
- **Programação Reativa:** RxJS
- **Componentes de UI:** Angular Material
- **Testes:** Jasmine
- **Qualidade de Código:** Lint
- **Pre-commit Hooks:** Husky
- **Internacionalização:** Angular Internacionalization


## Demo
Voce pode acessar a demo do projeto realizado o deploy em [Demo](https://mottu-jordanio.netlify.app/)



## Próximos Passos
- **Melhoria da internacionalização:** Identificação do idioma do navegador e indicar o idioma da aplicação de forma automatica
- **Melhoria nos observables da home** Uso do async pipe nas requisições e observables.
- **Preservar Favoritos** Incluir Favoritos em Storage para não perder no recarregamento.


## Testes

Testes unitários foram escritos nos principais componentes e telas afim de trazer mais segurança e qualidade para o projeto, para rodar os testes basta rodar o comando.
```sh
npm test
```

## Lint

O lint foi configurado afim de trazer qualidade de código e padronizagem de desenvolvimento, para rodar o lint execute o comando:
```sh
npm run lint
```


## Internacionalizacão
Para  permitir que o projeto seja internacional, foi introduzido o conceito de internacionalização com a utilização o i18n, voce pode rodar os projetos em 3 idiomas:
### Portugues
```sh
npm start
```
### Inglês
```sh
npm run start:en
```
### Espanhol
```sh
npm run start:es
```


## Pre Push Process
No processo de pre-commit os comandos de lint e test unitários são rodados para conferir a integridade do código

## Pre Push Commit
No processo de pre-Commit os comandos de build são rodados para conferir a integridade da aplicação.

## Começando

### Pré-requisitos

- Node.js 16.13.0
- npm

### Instalação

1. Clone o repositório:
```sh
git clone https://github.com/jordaniodev/mottu-challenge
```

2. Entre no projeto:
```sh
cd mottu-challenge
```

3. Instale a dependencias:
```sh
npm i
```

3. Rodar projeto:
```sh
npm start
```
