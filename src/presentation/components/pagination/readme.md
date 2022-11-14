## Pagination Component

### Props:

```ts
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handleNextPage: (page: number) => Promise<void>;
  handlePrevPage: (page: number) => Promise<void>;
};
```

### Example:

```tsx
<Pagination
  currentPage={1}
  totalPages={5}
  handleNextPage={
    async () => { setCurrentPage((prevState) => prevState + 1); }
  }
  handlePrevPage={
    async () => { setCurrentPage((prevState) => prevState - 1); }
  }
/>
```
