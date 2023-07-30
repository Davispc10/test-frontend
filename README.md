# Desafio Front-End Dinheirow | Tarcísio Almeida

Meu portfolio: [https://tarcisio-portfolio.vercel.app/](https://tarcisio-portfolio.vercel.app/)

Linkedin: [https://www.linkedin.com/in/tarcisio-a-0a5577207/](https://www.linkedin.com/in/tarcisio-a-0a5577207/)

<table>
  <tr>
    <td>
     <img src="https://res.cloudinary.com/domwy2hmn/image/upload/v1690739964/darkmode-website_s2hq0d.png" alt="dark-mode-website">
    </td>
    <td>
      <img src="https://res.cloudinary.com/domwy2hmn/image/upload/v1690740037/lightmode-website_kyykoj.png" alt="light-mode-website">
    </td>
  </tr>
</table>

<br/>

Acesse: [https://marvel-heroes-frontendchallenge-tarcisio.vercel.app/](https://marvel-heroes-frontendchallenge-tarcisio.vercel.app/)

## 🧑‍💻 Sobre o Projeto

Pontos a se destacar:

<ol>
<li>SEO: Utilização de <strong>tags semânticas</strong> para o conteúdo, h1 para o texto principal > button > img , main, section, header, footer e etc.</li>
<li>Image CDN: Utilização de serviços CDN para garantir otimização das imagens</li>
<li>Prettier: Utilização de <strong>sorting</strong> para manter um padrão de organização e posição das classes tailwind e imports em cada arquivo.</li>
<li>Husky: Utilização de pre-scripts para garantir a prevenção de erros antes de cada commit.</li>
<li>Actions: workflows para automação de testes e2e e lint</li>
<li>Padrão de commits: <strong>Husky</strong> está rodando com <strong>commitlint</strong> para garantir a padronização dos commits e utilizando o <strong>commitizen</strong> para forçar o uso dos padrões sempre que algum commit for realizado.
<br />
<br />
<img src="https://res.cloudinary.com/domwy2hmn/image/upload/v1690748275/commitizenshowcase_kzxyuq.gif" alt="commitizen">
<br />
<br />
</li>
<li>Auto-formating: Husky está garantindo a autoformatação dos arquivos em cada commit rodando o prettier.</li>
<li>
  Metadata dinâmico: para garantir uma boa experiência no compartilhamento de personagens, o metadata da rota está de acordo com o personagem que está sendo compartilhado:
  <br />
  <br />
  <img src="https://res.cloudinary.com/domwy2hmn/image/upload/v1690747828/flash-spider_l84mzm.png" alt="Flash thompson">
  <br />
  <small>Card exemplo de personagem compartilhado via Discord.</small>
  <br />
</li>
</ol>

## 🎨 Animações

As animações são muito importantes, com elas podemos direcionar 100% da atenção do usuário para o que importa.

<ul>
 <li>Comic background: animação utilizada pra destacar de forma sutil o fundo de quadrinhos (somente no lightmode)</li>
 <li>Characater card floating: animação sutil para destacar o card do personagem selecionado</li>
 <li>Color brightness change: animação sutil para destacar a mudança de cor dos cards dos personagens ao hover</li>
</ul>

---

## ✅ Testes e2e

Utilizei cypress para testar os fluxos de busca de personagem com sugestão, filtro de personagens, paginação e rota para detalhes de personagem e etc

<img src="https://www.cypress.io/cypress_logo_social.png" alt="Testes e2e">

## 📚 Stack de desenvolvimento e decisões

<ul>
<li>Next.js, última versão usando App router (experimental), ainda não usaria em um projeto em produção.</li>
<li>Typescript, Eslint com rotina automatizada usando Husky para otimizar código antes do commit.</li>
<li>React Query para encapsular os dados</li>
<li>Tailwind css e CSS para animações, estilização</li>
<li>Headless UI para utilizar na criação de alguns componentes</li>
<li>yet-another-react-lightbox para feature de galeria</li>
<li>lodash para garantir qualiade nas requests de input</li>
<li>slick-carousel para o showcase dos comics</li>
</ul>

## ⌚️ Features que poderia ter feito com mais tempo

<ul>
<li>Melhoria na paginação da tela principal</li>
<li>Paginação na tela de detalhes do personagem</li>
<li>Melhoria no input de pesquisa para garantir a funcionalidade sem erros inesperados</li>
<li>Dockerização do frontend</li>
<li>Testes unitários com jest</li>
<li>Cobrir mais possíveis use cases no cypress</li>
</ul>

## 💼 Agradecimento

Agradeço a oportunidade de participar do processo. Espero que gostem.

<br/>

---

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Node.js 18.15.0+

<br/>

## 👇 Instalando Desafio Front-End Dinheirow

Para instalar o Desafio Front-End Dinheirow, siga estas etapas:

Linux e macOS:

```
npm install
npm run prepare
```

Windows:

```
npm install
npm run prepare
```

<br/>

## ☕ Usando Desafio Front-End Dinheirow

Para usar Desafio Front-End Dinheirow, siga estas etapas:

```
npm run dev
# or
yarn dev
# or
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador e veja o resultado.

<br/>

Para compilar Desafio Front-End Dinheirow, siga estas etapas:

```
npm run build
```

<br/>

Esse é um projeto [Next.js](https://nextjs.org/) criado com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
