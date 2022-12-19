import * as React from "react";
import { Button } from "@mui/material";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

export type NavbarItemProps = LinkProps & { showUnderlinex: boolean };

export const NavbarItem = (props: PropsWithChildren<NavbarItemProps>) => {
  const { showUnderlinex, ...linkProps } = props;

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
  );
};

export default NavbarItem;
