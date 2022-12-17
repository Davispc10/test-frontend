import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import theme from "../util/theme";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { http_marvel_get } from "../util/http";
import AnimationsHome from "./AnimationHome";
import { useSnapshot } from "valtio";
import { state } from "../pages/store";

type CharacterListType = {
  count: number;
  limit: number;
  offset: number;
  results: [];
  total: number;
};

export default function CharacterList() {
  const snap = useSnapshot(state);
  const searchName = snap.search.toLowerCase();

  const router = useRouter();

  const [characteres, setCharacteres] = useState<CharacterListType>();
  const [pages, setPages] = useState(0);
  const [scrollComplete, setScrollComplete] = useState(false);

  function getCharacter() {
    if (scrollComplete) {
      return;
    }

    const limit = 100;
    const offset = pages * limit;
    const promise = http_marvel_get("characters", {
      params: { limit: limit, offset: offset },
    });

    promise.then((res: any) => {
      const lastCharacteres = characteres;
      const newCharacteres = res.data as CharacterListType;
      lastCharacteres?.results.push(...newCharacteres.results);

      // stop request
      if (newCharacteres.results.length < limit) {
        setScrollComplete(true);
      }

      setCharacteres({
        count: newCharacteres.count,
        limit: newCharacteres.limit,
        total: newCharacteres.total,
        results: lastCharacteres?.results || newCharacteres.results,
        offset: newCharacteres.offset,
      });
      console.log(characteres);
    });

    promise.catch((err: Error) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getCharacter();
  }, [pages]);

  if (!characteres?.results) {
    return <AnimationsHome />;
  } else {
    return (
      <>
        <List
          dense
          // sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          sx={{
            width: "100%",
            maxWidth: 650,
            bgcolor: `${alpha(theme.palette.common.black, 0.9)}`,
            position: "relative",
            overflow: "auto",
            maxHeight: 410,
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
          onScroll={(scroll) => {
            const targetList: any = scroll.target;
            if (
              targetList.offsetHeight + targetList.scrollTop >=
              targetList.scrollHeight
            ) {
              if (!scrollComplete) {
                setPages(pages + 1);
              }
            }
          }}
        >
          {characteres?.results
            ?.filter((character: any) => {
              const characterName: string = character.name.toLowerCase();
              return characterName.includes(searchName);
            })
            .map((character: any) => {
              const labelId = `checkbox-list-secondary-label-${character.id}`;
              return (
                <ListItem
                  key={character.id}
                  secondaryAction={
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        router.push({
                          pathname: "/galeria",
                          query: { data: character.resourceURI },
                        });
                      }}
                    >
                      Detalhes
                    </Button>
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Personagem ${character.name}`}
                        // src={`/static/images/avatar/${value + 1}.jpg`}
                        src={`${character.thumbnail.path}.`.concat(
                          character.thumbnail.extension
                        )}
                      />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={character.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
        {`Mostrando ${characteres?.results?.length} de ${characteres.total}`}
      </>
    );
  }
}
