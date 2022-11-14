## Home View

### Props:

```ts
type HomeProps = {
  loadCharacters: LoadCharacters;
  requestHandler: RequestHandler<Character[]>;
};
```

### Example:

```tsx
const makeHomeComponent = () => {
  const remoteLoadCharacters = makeRemoteLoadCharacters();
  const requestHandlerReactQueryAdapter = makeRequestHandlerReactQueryAdapter<Character[]>();
  return <Home loadCharacters={remoteLoadCharacters} requestHandler={requestHandlerReactQueryAdapter} />;
};
```

```tsx
<Route path="/characters/details/:id" element={makeCharacterDetailsComponent()} />
```
