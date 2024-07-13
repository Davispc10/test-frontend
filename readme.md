# Desafio Marvel - Front-end

Este repositório contém o código fonte para o desafio Front-End da Dinheirow, as instruções podem ser encontradas [aqui](instrucoes.md).
A aplicação interage com a API oficial da Marvel Comics, permitindo listar personagens, filtrar por nome e visualizar detalhes de cada personagem.

## Tecnologias Utilizadas

- Next.js
- TypeScript
- Tailwind CSS
- React Query
- Jest
- Testing Library
- Cypress

## Instalação

Para começar a usar este projeto, siga os passos abaixo:

1. Clone este repositório:
  ```sh
    git clone https://github.com/RafaelPanisset/test-frontend.git
  ```

2. Navegue até o diretório do projeto:
  ```sh
    cd test-frontend/marvel-challenge
  ```

3. Configure as variáveis de ambiente:
  ```sh
    NEXT_PUBLIC_KEY=sua_public_key_aqui
    NEXT_PUBLIC_HASH=seu_hash_aqui
  ```

4. Instale as dependências:
  ```sh
    npm install
  ```
5. Execute os testes Jest:
  ```sh
    npm test
  ```

6. Para executar os testes Cypress:
  ```sh
    npx cypress run
  ```

7. Para iniciar o servidor de desenvolvimento e ver o aplicativo em   ação, execute:
  ```sh
    npm run dev
  ```


## Demonstração
![GIF Demonstrando o Funcionamento](marvel-challenge.gif)
