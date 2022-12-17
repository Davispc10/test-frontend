import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import theme from '../util/theme';
import { Button } from '@mui/material';
import { useRouter } from "next/router";
import { http_marvel_get } from '../util/http';
import AnimationsHome from './AnimationHome';


export default function CharacterList() {
  
  const router = useRouter();
  const [checked, setChecked] = useState([1]);
  const [characteres, setCharacteres] = useState([]);



  function getCharacter() {
    const promise = http_marvel_get("comics");
    promise.then((res: any) => {
      setCharacteres(res.data.results)
    });
    promise.catch((err: Error) => {
      console.log(err);
    })
  }


  useEffect(() => {
    getCharacter();
  },[])



  console.log(characteres)

 
  // const handleToggle = (value: number) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };


  if( characteres.length === 0 ){
    return (<AnimationsHome/>)
  } else 
    return (

    <>
      <List 
        dense 
        // sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        sx={{
          width: '100%',
          maxWidth: 900,
          bgcolor: `${alpha(theme.palette.common.black, 0.9)}`,
          position: 'relative',
          overflow: 'auto',
          maxHeight: 410,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
        >
        
        {characteres.map((character: any) => {
          const labelId = `checkbox-list-secondary-label-${character.id}`;
          return (
            <ListItem
              key={character.id}
              secondaryAction={
                <Button 
                  size='small' 
                  variant="outlined"
                  onClick={() => {
                    router.push({
                      pathname: '/galeria',
                      query: { data: character.resourceURI},
                    })
                    }
                  }
                >
                  Detalhes
                </Button>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`Personagem ${character.title}`}
                    // src={`/static/images/avatar/${value + 1}.jpg`}
                    src={`${character.thumbnail.path}.`.concat(character.thumbnail.extension)}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={character.title} />
              </ListItemButton>
            </ListItem>
          );
        })}

      </List>
    
      Mostrando 1 de 500
    </>
  );
}