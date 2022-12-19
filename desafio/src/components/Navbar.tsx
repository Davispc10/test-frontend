import * as React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import Image from "next/image";
import { alpha } from "@mui/material/styles";
import theme from "../util/theme";

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "none", boxShadow: "none" }}>
        <Toolbar
          style={{
            WebkitScrollSnapType: "none",
            backgroundColor: alpha(theme.palette.common.black, 0.65),
          }}
        >
          <Image
            src={"/img/capitao2.png"}
            quality={100}
            width={68}
            height={55}
            sizes="100vw"
            alt="logo"
            priority={true}
            style={{
              objectFit: "cover",
            }}
          />
          <Image
            src={"/img/logo.png"}
            width={315}
            height={58}
            alt="logo"
            priority={true}
            style={{
              objectFit: "cover",
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
              objectFit: "cover",
            }}
          />

          {/* <Box sx={{ flexGrow: 1, ml: (theme) => theme.spacing(4) }}>
            <NavbarItem href="/" showUnderlinex={router.pathname === "/"}>
              Home
            </NavbarItem>
            <NavbarItem
              href="/details"
              showUnderlinex={router.pathname === "/details"}
            >
              Detalhes
            </NavbarItem>
            <NavbarItem
              href="/contato"
              showUnderlinex={router.pathname === "/contato"}
            >
              Contato
            </NavbarItem>
          </Box> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
