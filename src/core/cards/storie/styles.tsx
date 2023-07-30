"use client";

import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 476px;
  height: 72px;
  text-decoration: none;
  margin: 8px;
  padding: 0px 16px;
  transition: all .3s;
  position: relative;
  z-index: 400;
  background-color: #000;

  p {
    color: #fff;
    margin: 0 ;
  }

  @media (max-width: 460px) {
      width: 300px;
  }
`;



