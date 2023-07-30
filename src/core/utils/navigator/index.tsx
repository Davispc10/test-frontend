"use client"

/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { ReactNode, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import {
  GeneralIcon,
  GeneralIconText,
  GeneralLinkedText,
  GeneralText,
  MenuIcon,
  Load
} from "./styles";


type NavigatorFace = {
  title: string;
  identifier?: string;
  type?: "button" | "submit" | "reset" | undefined;
  style?:
  | "general-icon-text"
  | "general-icon"
  | "general-text"
  | "general-linked-text"
  | "menu-icon"
  children: ReactNode;
  href?: string;
  action?: (() => void) | ((e: any) => void);
  load?: boolean;
  loadColor?: string;
  disabled?: boolean;
  target?: string;
  // className?: string;
  rel?: string;
};

function Navigator({
  title,
  identifier,
  type,
  style,
  children,
  href,
  action,
  load,
  loadColor,
  disabled,
  target,
  // className,
  rel,
}: NavigatorFace) {
  const ref = useRef(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  function hrefReplace(href: string) {
    window.location.href = href;
  }

  useEffect(() => {
    ref.current ? setWidth(ref.current.offsetWidth) : 0;
    ref.current ? setHeight(ref.current.offsetHeight) : 0;
  }, [ref.current]);

  interface IClasses {
    id: string | undefined;
    "data-cy": string | undefined;
    title: string;
    // className: string | undefined;
    target: string | undefined;
    rel: string | undefined;
    disabled: boolean | undefined;
    href: string | undefined;
    onClick: (() => void) | ((e: any) => void) | undefined;
    ref: any;
    type: "button" | "submit" | "reset" | undefined;
  }

  const dataClass: IClasses = {
    id: identifier,
    "data-cy": identifier,
    title,
    // className,
    target,
    rel,
    disabled,
    href,
    onClick: undefined,
    ref,
    type,
  };


  const styleToComponentMap = {
    "general-icon-text": GeneralIconText,
    "general-icon": GeneralIcon,
    "general-text": GeneralText,
    "general-linked-text": GeneralLinkedText,
    "menu-icon": MenuIcon,
  };

  if (href) {
    dataClass.href = href;
  } else {
    dataClass.onClick = () => (href ? hrefReplace(href) : action ? action : "");
  }

  if (target) {
    dataClass.target = target;
    dataClass.rel = rel ? rel : target ? "noopener noreferrer" : "";
  }

  if (action) {
    dataClass.onClick = action;
  }

  if (load) {
    return (
      <>
        <Load
          style={{
            width: Number(width),
            height: Number(height),
          }}
        >
          <ClipLoader
            size={23}
            color={loadColor ? loadColor : "var(--primary-color)"}
          />
        </Load>
      </>
    );
  }

  if (href) {
    return (
      <Link {...dataClass} href={href}>
        {children}
      </Link>
    );
  } else {
    return (
      <>
        {style === "general-icon-text" && <GeneralIconText {...dataClass}>{children}</GeneralIconText>}
        {style === "general-icon" && <GeneralIcon {...dataClass}>{children}</GeneralIcon>}
        {style === "general-linked-text" && <GeneralLinkedText {...dataClass}>{children}</GeneralLinkedText>}
        {style === "menu-icon" && <MenuIcon {...dataClass}>{children}</MenuIcon>}
      </>
    );
  }
}

export default Navigator;
