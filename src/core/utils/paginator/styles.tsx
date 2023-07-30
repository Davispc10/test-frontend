"use client";

import styled from "styled-components";

export const PaginatorStyle = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 24px;
  transition: all .2s;

  &:hover{
    transform: scale(1.20);
  }
`;

export const Label = styled.div`
  label input {
    width: 40px;
    height: 36px;
    border: 0px;
    outline: none;
    background-color: #0f0f0f;
    color: #fff;
    font-size: 18px;
    text-align: center;
  }
`

export const LoaderStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 37px;
  margin-bottom: 37px;

`;

export const ProblemStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 10px;
  margin-top: 17px;
  margin-bottom: 57px;
  
  p {
    color: white;
    font-size: 18px;
  }
`;