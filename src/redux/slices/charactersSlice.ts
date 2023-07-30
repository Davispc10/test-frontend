import { Characters, getCharacters } from "@/lib/marvel";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

export interface CharactersMarvel {
  characters: Characters[];
  search: string
}

function splitGroups(characters: Characters) {
  const groups = [];
  const length = 6;
  const totalGroups = Math.ceil(characters.length / length);

  for (let i = 0; i < totalGroups; i++) {
    const startAt = i * length;
    const end = startAt + length;
    groups.push(characters.slice(startAt, end));
  }

  return groups;
}

function joinGroups(groups: Characters[]) {
  return groups.reduce((result, group) => result.concat(group), []);
}

let initialState: CharactersMarvel = {
  characters: [],
  search: ''
};

export const fetchCharacters = createAsyncThunk(
  "charactersMarvel/fetchCharacters",
  async () => {
    const result = await getCharacters();
    return splitGroups(result);
  }
);

export const charactersSlice = createSlice({
  name: "charactersMarvel",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.characters = action.payload;
    });
  },
  reducers: {
    setCharacters: (state, action: PayloadAction<Characters>) => {
      state.characters = splitGroups(action.payload)
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    searchName: (state, action: PayloadAction<string>) => {
      const allCharacters = joinGroups(state.characters);
      state.characters = [
        allCharacters.filter((item) => item.name.toLowerCase().includes(action.payload.toLowerCase())),
      ];
    },
  },
});

export const { searchName, setCharacters, setSearch } = charactersSlice.actions;

export default charactersSlice.reducer;
