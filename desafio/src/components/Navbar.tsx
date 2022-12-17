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
import { NavbarItem } from './NavbarItem';
import theme from '../util/theme';



// type OnChangeProps = {
//   onChangeSearch: (event: React.ChangeEvent) => void;
//   // const SearchAppBar = ({onChange}: {onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void } ) => {
// }


// export const Navbar = ({onChangeSearch}:  OnChangeProps) => {
export const Navbar = () => {

  const router = useRouter();

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" sx={{ background: "none", boxShadow: "none" }}>
        <Toolbar style={{ WebkitScrollSnapType:'none', backgroundColor: alpha(theme.palette.common.black, 0.65),}}>
          <Image 
            src={"/img/capitao2.png"}
            quality={100} 
            width={68}
            height={55}
            sizes="100vw" 
            alt="logo" 
            priority={true}
            style={{
              objectFit: 'cover',
            }}
          />
          <Image 
            src={"/img/logo.png"}
            width={315}
            height={58}
            alt="logo"
            priority={true}
            style={{
              objectFit: 'cover',
            }}
          />

          <Image 
            src={"/img/tonystark.png"} 
            quality={100} 
            width={58}
            height={60}
            sizes="100vw" 
            alt="logo" 
            priority={true}
            style={{
              objectFit: 'cover',
            }}  
          />


          <Box sx={{ flexGrow: 1, ml: (theme) => theme.spacing(4) }}>
            <NavbarItem href="/" showUnderlinex={router.pathname === "/"}>Home</NavbarItem>
            <NavbarItem href="/galeria" showUnderlinex={router.pathname === "/galeria"}>Galeria</NavbarItem>
            <NavbarItem href="/contato" showUnderlinex={router.pathname === "/contato"}>Contato</NavbarItem>
          </Box>

          

        </Toolbar>

      </AppBar>
    </Box>
  )
}