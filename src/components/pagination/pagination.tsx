import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  justify-content: center;
  background-color: transparent;
  border: 0px;
`;
export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  ul {
    display: flex;
    justify-content: center;
  }

  li {
    padding: 5px;
  }
`;

type ISettings = {
  limit: number;
  total: number;
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
};

const maxItem = 5;
const maxLeft = (maxItem - 1) / 2;
const Pagination = ({ limit, total, offset, setOffset }: ISettings) => {
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const first = Math.max(current - maxLeft, 1);

  function toPage(page: number) {
    setOffset((page - 1) * limit);
  }
  return (
    <PaginationContainer>
      <ul>
        <li>
          <Button onClick={() => toPage(current - 1)}>{"<"}</Button>
        </li>
        {Array.from({ length: Math.min(maxItem, pages) })
          .map((_, index) => index + first)
          .map((page, index) => (
            <li key={index}>
              <Button onClick={() => toPage(page)} className={page === current ? 'selected' : ''}>{page}</Button>
            </li>
          ))}
        <li>
          <Button onClick={() => toPage(current + 1)}
          >{">"}</Button>
            
        </li>
      </ul>
    </PaginationContainer>
  );
};
export default Pagination;
