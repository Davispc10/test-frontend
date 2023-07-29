# test-frontend

esse projeto é um teste técnico para a [Dinheirow](https://dinheirow.com.br/). é uma aplicação web que consome a api da marvel e lista os personagens, seguindo as instruções deste repo: [test-frontend](https://github.com/Davispc10/test-frontend).

### como rodar

eu fiz o [deploy na vercel]() para visualização, mas para rodar localmente basta:

1. clonar o repo com `git clone git@github.com:antoniopataro/test-frontend.git`
2. instalar as dependências com `npm install` ou outro package manager
3. criar um arquivo chamado `.env` e definir as variáveis de ambiente, com as suas credenciais da api da marvel, conforme:
   - NEXT_PUBLIC_MARVEL_PUBLIC_KEY
   - NEXT_PUBLIC_MARVEL_PRIVATE_KEY
4. rodar `npm run dev` pra ver a versão de desenvolvimento ou `npm run build && npm start` para a versão buildada

### tecnologias e dependências:

- axios
- heroicons
- jest
- next.js
- react-indiana-drag-scroll
- tailwindcss w/ postcss
- testing-library
- typescript
- yet-another-react-lightbox
