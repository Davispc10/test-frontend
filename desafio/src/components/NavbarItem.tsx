import * as React from 'react';
import { AppBar, Box, Toolbar, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchAppBar from './Search';

export type NavbarItemProps = LinkProps & { showUnderlinex: boolean };



export const NavbarItem = (props: PropsWithChildren<NavbarItemProps>) => {
  const { showUnderlinex, ...linkProps } = props;

  // console.log
  return (
  
    //@ts-expect-error
    <Button 
      component={Link} 
      sx={{
        color: "white",
        display: "inline-block",
        textAlign: "center",
        "&::after": (theme) => ({
          content: '""',
          borderBottom: showUnderlinex
            ? `4px solid ${theme.palette.primary.main}`
            : `4px solid transparent`,
          width: "100%",
          display: "block",
        }),
      }}
      {...linkProps}
    
    />
  )
}


export default NavbarItem