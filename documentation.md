# MARVEL CHARACTERS CODEX - Documentation

# 1. About the project

This is a project for a technical test for a front-end developer position. The project consists of a web application that allows you to search for Marvel characters and see details of their comics. The project was developed using Next.js, TypeScript, TailwindCSS, React Query and Jest.

Users can search for characters by name and see a list of characters with pagination. When clicking on a character, the user can see a description of the character and a list of comics that the character has participated in.

# 2. Libraries and tools

This section will list most of the external libraries and tools inside `packjage.json` as well as their main purpose in the project.

- TypeScript —— Typed superset of JavaScript
- React —— JavaScript library for building user interfaces
- Next.JS —— Framework for React applications
- TailwindCSS —— CSS framework for styling
- PostCSS —— CSS post-processor (used by TailwindCSS)
- React Query —— Library for data fetching and caching
- Jest —— Testing framework
- TS-Jest —— TypeScript preprocessor with sourcemap support for Jest
- Testing Library —— Library for testing React components
- Axios —— HTTP client
- React-test-renderer —— Library for testing React components
- React-toastify —— Library for toast notifications
- Phosphor Icons —— Icon library
- CLSX —— Library for conditional class names
- Framer-motion —— Library for animations
- React-error-boundary —— Library for error boundaries
- Jotai —— Library for state management (atoms) (alternative to Redux)
- React-medium-image-zoom —— Library for image zoom (lightbox)
- Chance —— Library for generating random data (used in tests)
- ESLint —— Linter for JavaScript
- Prettier —— Code formatter

# 3. Folder structure and architecture

The project was developed based on the [Bulletproof React](https://github.com/alan2207/bulletproof-react), adapted to the technologies used in the project. The folder structure is as follows (simple version):

```
├── public              #Static files
├── src                 #Source code
│   ├── __mocks__       #Mocks for tests
│   ├── __tests__       #General tests
│   ├── assets          #Images and icons
│   ├── atoms           #Atoms from [Jotai](https://jotai.org/)
│   ├── components      #General Components
│   │   ├── animations  #Animations
│   │   ├── comics      #Comics components
│   │   ├── hero        #Hero components
│   ├── pages           #Next.js pages
│   ├── config          #Configuration for env and other things
│   ├── features        #Features of the application, this folder deals with the business logic of the application, each feature includes its own hooks, types, api and tests
│   │   ├── comics      #Comics feature
│   │   │   ├── __tests__
│   │   │   ├── hooks
│   │   │   ├── types
│   │   │   ├── api
│   │   ├── heroes      #Heroes feature
│   │   │   ├── __tests_
│   │   │   ├── hooks
│   │   │   ├── types
│   │   │   ├── api
│   ├── lib            #Re-exporting libraries preconfigured for the application
│   ├── providers      #All of the application providers
│   ├── styles         #Global styles

```
