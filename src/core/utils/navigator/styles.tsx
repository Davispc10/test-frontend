"use client";

import styled from "styled-components";

export const Load = styled.div`
  display: flex;
  align-items: center;
  content: "entrar";
  justify-content: center;
  width: 23px;
  height: 23px;
`;

export const TagLink = styled.a`
  display: contents;
  background-color: transparent;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  text-decoration: none !important;
  justify-content: stretch;
  user-select: none;
`;

export const GeneralIconText = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  user-select: none;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  background: var(--red);
  padding-left: 16px;
  padding-right: 16px;
  height: 36px;
  transition: all 0.3s;
  border: 0px;

  &:hover {
    text-decoration: none;
    background-color: var(--dark-red);
  }

  &:hover svg {
    color: #000;
  }

  &:hover span {
    color: #000;
  }

  svg {
    color:#000;
    transition: all 0.1s;
    height: 16px;
    width: 16px;
    margin-right: 12px;
    transition: all 0.3s;
  }


  span {
    font-family: "Lato", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.75px;
    color: #000;
    transition: all 0.3s;
  }

  &:disabled,
  &:disabled:hover,
  &[disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    transform: none;
  }

  &:disabled:hover span,
  &:disabled:hover svg {
    color: #666666 !important;
    transform: none;
  }
`;

export const GeneralIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  user-select: none;
  margin: 0px;
  padding: 0px;
  border: none;
  box-sizing: border-box;
  background: transparent;
  border-radius: 10px;
  padding-left: 8px;
  padding-right: 8px;
  height: 36px;
  transition: all 0.1s;

  svg {
    color: #ed1d24; /* Vermelho escuro usado pela Marvel */
    transition: all 0.1s;
    height: 20px;
    width: 20px;
  }

  &:hover svg {
    transform: scale(1.15);
  }

  &:disabled,
  &:disabled:hover,
  &[disabled] {
    background-color: transparent;
    color: #666666;
    transform: none;
  }

  &:disabled:hover svg {
    transform: none;
  }
`;

export const GeneralText = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  user-select: none;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  background: var(--accent-color);
  border: 1px solid var(--accent-color);
  box-shadow: 0px 3px 5px 1px rgba(15, 148, 204, 0.15);
  border-radius: 10px;
  padding-left: 16px;
  padding-right: 16px;
  height: 36px;
  transition: all 0.2s;

  &:hover {
    text-decoration: none;
    border: 1px solid var(--accent-color-v1);
    background-color: var(--accent-color-v1);
  }

  span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.75px;
    color: #ffffff;
  }

  &:hover span,
  &:hover svg {
    font-weight: bold;
    color: #fff !important;
  }

  &:disabled,
  &:disabled:hover,
  &[disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    transform: none;
  }

  &:disabled:hover span {
    color: #666666 !important;
    transform: none;
  }
`;

export const GeneralLinkedText = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  user-select: none;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  background: transparent;
  border: none;
  margin: 3px;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;

  &:hover {
    text-decoration: none;
    border-bottom: 2px solid var(--accent-color-v1);
  }

  span {
    font-family: "Ubuntu";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.75px;
    color: var(--accent-color);
  }

  &:hover span,
  &:hover svg {
    font-weight: bold;
    color: var(--accent-color-v1) !important;
  }

  &:disabled,
  &:disabled:hover,
  &[disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    transform: none;
  }

  &:disabled:hover span {
    color: #666666 !important;
    transform: none;
  }
`;

export const MenuIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  user-select: none;
  margin: 0px;
  padding: 0px;
  border: none;
  box-sizing: border-box;
  background: transparent;
  border-radius: 10px;
  padding-left: 8px;
  padding-right: 8px;
  height: 36px;
  transition: all 0.1s;

  svg {
    color: #ed1d24; /* Vermelho escuro usado pela Marvel */
    transition: all 0.1s;
    height: 20px;
    width: 20px;
  }

  &:hover svg {
    transform: scale(1.15);
  }

  &:disabled,
  &:disabled:hover,
  &[disabled] {
    background-color: transparent;
    color: #666666;
    transform: none;
  }

  &:disabled:hover svg {
    transform: none;
  }
`;
