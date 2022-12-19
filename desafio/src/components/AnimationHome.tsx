import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { alpha } from "@mui/material/styles";
import theme from "../util/theme";
import Skeleton from "@mui/material/Skeleton";

export default function AnimationsHome() {
  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 650,
        bgcolor: `${alpha(theme.palette.common.black, 0.9)}`,
        position: "relative",
        overflow: "auto",
        maxHeight: 410,
        "& ul": { padding: 0 },
        borderRadius: 5,
      }}
      subheader={<li />}
    >
      {[1, 2, 3, 4, 5, 6, 7].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Skeleton variant="rectangular" width={80} height={35} />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={90}
                  height={80}
                  style={{
                    marginRight: 20,
                  }}
                />
              </ListItemAvatar>
              <Skeleton animation="wave" height={60} width={350} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
