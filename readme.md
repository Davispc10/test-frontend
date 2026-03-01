# Pokédex — Dinheirow Challenge

Uma aplicação front-end moderna para explorar Pokémon, conectada à PokéAPI, com listagem, busca, filtros avançados e modal de detalhes.

## 🚀 Deploy

**[Acessar aplicação em produção](https://test-frontend-phi-three.vercel.app)**

## Stack Tecnológica

- **Node.js** (LTS)
- **Next.js 15** — App Router, Server Components
- **React 18** — Hooks, Suspense
- **TypeScript** — Tipagem estática
- **Tailwind CSS** — Estilização
- **TanStack Query** — Cache e estado assíncrono
- **shadcn/ui** — Componentes acessíveis
- **Vitest** — Testes unitários e de UI

## Checklist de Requisitos

- [x] Listagem de Pokémons com paginação
- [x] Busca por nome
- [x] Filtros avançados (tipo, geração, cor, habitat, ataque, experiência)
- [x] Super Modal com dados avançados (taxa de captura, grupos de ovos, cadeia evolutiva)
- [x] Layout responsivo
- [x] Página de detalhes (nome, descrição, sprites)
- [x] Botão voltar para listagem
- [x] Persistência de filtros e página na URL
- [x] Imagem padrão quando não há sprite
- [x] Descrição padrão quando não informada
- [x] Cache de 30 segundos (TanStack Query)

## Como rodar

```bash
# Instalação
npm install

# Desenvolvimento
npm run dev

# Build
npm run build

# Testes
npm run test
npm run test:run
```

## Arquitetura

Consulte [ARCHITECTURE.md](./ARCHITECTURE.md) para detalhes sobre Clean Architecture, SOLID e padrões de projeto.
