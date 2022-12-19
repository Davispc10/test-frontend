import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { http_marvel_url } from "../util/http";
import { Page } from "../components/Page";
import Grid from "@mui/material/Grid";
import { Box, Button, TextareaAutosize } from "@mui/material";
import * as ImageNext from "next/image";

type Thumbnail = {
  path: string;
  extension: string;
};

type ResultsType = {
  thumbnail: Thumbnail;
  id: number;
  name: string;
  description: string;
};

type CharacterListType = {
  results: [ResultsType];
};

export const Details = () => {
  const router = useRouter();
  const [characterDetails, setCharacterDetails] = useState<CharacterListType>();

  function getDetailsFromCharacter() {
    if (!router.query.data) return;
    const url = router.query.data as string;

    const promise = http_marvel_url(url);

    promise.then((res) => {
      console.log(res);
      setCharacterDetails(res.data);
    });

    promise.catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getDetailsFromCharacter();
  }, [router.query.data]);

  const myLoader = ({ src = "", width = 0, quality = 0 }) => {
    return `${src}`;
  };

  return (
    <>
      <Page>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => {
            router.back();
          }}
        >
          Return
        </Button>
        <Grid
          columns={2}
          container
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: (theme) => theme.spacing(2),
          }}
        >
          {characterDetails?.results.map((detail) => {
            return (
              <>
                <Box
                  key={detail.id}
                  sx={{
                    width: 456,
                    height: 406,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    border: 5,
                    borderColor: "black",
                    borderRadius: 5,
                  }}
                >
                  <ImageNext.default
                    key={detail.id}
                    loader={myLoader}
                    src={`${detail.thumbnail.path}.${detail.thumbnail.extension}`}
                    quality={100}
                    width={450}
                    height={400}
                    alt={detail.name}
                    priority={true}
                    style={{
                      objectFit: "cover",
                      alignSelf: "center",
                      borderRadius: 15,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    width: "59%",
                    height: 406,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    padding: 2,
                    border: 5,
                    borderColor: "black",
                    borderRadius: 5,
                    opacity: [0.2, 0.5, 0.9],
                  }}
                >
                  <TextareaAutosize
                    maxRows={4}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    defaultValue={
                      detail.description || "Description not informed"
                    }
                    disabled
                    style={{
                      padding: 15,
                      width: "100%",
                      height: "100%",
                      fontSize: 18,
                      fontStyle: "normal",
                      textAlign: "justify",
                      textJustify: "auto",
                      font: "Arial bold",
                    }}
                  />
                </Box>
              </>
            );
          })}
        </Grid>
      </Page>
    </>
  );
};

export default Details;
