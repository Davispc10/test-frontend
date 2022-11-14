## CharacterDetails View

### Props:

```ts
type CharacterDetailsProps = {
  loadCharactersComics: LoadCharactersComics;
  requestHandler: RequestHandler<LoadCharactersComicsResult>;
};
```

### Example:

```tsx
const makeCharacterDetailsComponent = () => {
  const requestHandlerReactQueryAdapter = makeRequestHandlerReactQueryAdapter<LoadCharactersComicsResult>();
  return <CharacterDetails loadCharactersComics={makeLoadCharactersComics()} requestHandler={requestHandlerReactQueryAdapter} />;
};
```

```tsx
<Route path="/" element={makeHomeComponent()} />
```
