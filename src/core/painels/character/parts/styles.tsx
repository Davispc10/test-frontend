"use client";

import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 32px;


  .carousel div { 
    overflow-y: hidden;
  }

  .carousel div[data-arrow]{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    top: 165px;
    z-index: 700;
    width: 50px;
    height: 50px;
    background-color: var(--black-bg);
    cursor: pointer;

    svg {
      height: 30px;
      width: 30px;
    }
  }

  .carousel div[data-arrow="right"]{
    right: 0;
    border-radius: 50px  0 0 50px;
    padding-left: 16px;
  }
  
  .carousel div[data-arrow="left"]{
    left: 0;
    border-radius: 0 50px 50px 0 ;
    padding-right: 16px;

  }

  @media (max-width: 460px) {
    .carousel div[data-arrow]{
      display: none;
      width: 32px;
      height: 32px;

      svg {
        height: 15px;
        width: 15px;
      }
    }

    .carousel div[data-arrow="right"]{
      padding-left: 8px;
    }
    
    .carousel div[data-arrow="left"]{
      padding-right: 8px;
    }
  }
`;

export const TextHelp = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  width: 100%;
`;

export const LoaderStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 323px;
  margin-top: 37px;
  margin-bottom: 37px;
`;