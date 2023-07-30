"use client";

import styled from "styled-components";

export const Search = styled.div`
    display: flex;
    position: absolute;
    right: 0;
    align-items: center;
    background-color: var(--black);

  div.inactive{
    width: 0px;
    transition: all .2s;
  }

  div.active{
    width: 400px;
    transition: all .2s;
  }

  @media (max-width: 400px) {
    div.active{
      width: 300px;
    }
  }
`;

export const SearchInputContainer = styled.div`
  input {
    height: 36px;
    width: calc(400px - 36px);
    background-color: #404040;
    outline: none;
    border: none;
    color: #fff;
    font-size: 18px;
    padding-left: 8px;
    padding-right: 8px;
  }

  @media (max-width: 400px) {
    input {
      width: 264px;
    }
  }
`;

export const SearchButtonContainer = styled.div`
  button {
    height: 36px;
    width: 36px;
    padding: 0;
  }

  button svg {
    color: white;
    width: 25px;
    height: 25px;
  }
`;

