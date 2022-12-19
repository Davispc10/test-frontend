import SearchAppBar from "../components/Search";
import { Page } from "../components/Page";
import Grid from "@mui/material/Grid";
import CharacterList from "../components/CharacterList";
import { state } from "./store";

export default function Home() {
  return (
    <Page>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: (theme) => theme.spacing(3),
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: (theme) => theme.spacing(3),
          }}
        >
          <SearchAppBar
            onChange={(searchValue) => {
              state.search = searchValue;
            }}
          />
          <CharacterList />
        </Grid>
      </Grid>
    </Page>
  );
}
