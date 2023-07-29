"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Character } from "@/entities/Character";

import { api } from "@/services/api";

import {
  Character as CharacterProps,
  Reference as ReferenceProps,
  Payload as PayloadProps,
} from "@/types/payload";

import { AxiosResponse } from "axios";

interface CharactersContextProps {
  characters: CharacterProps[];
  error: boolean;
  getCharacter: (
    id: number
  ) => Promise<PayloadProps<CharacterProps> | undefined>;
  getCharacters: ({
    limit,
    offset,
    nameStartsWith,
    orderBy,
  }: {
    limit?: number;
    nameStartsWith?: string;
    offset?: number;
    orderBy?: "name" | "modified" | "-name" | "-modified";
  }) => Promise<PayloadProps<CharacterProps> | undefined>;
  getCharacterComics: (
    id: number
  ) => Promise<PayloadProps<ReferenceProps> | undefined>;
  getCharacterEvents: (
    id: number
  ) => Promise<PayloadProps<ReferenceProps> | undefined>;
  getCharacterSeries: (
    id: number
  ) => Promise<PayloadProps<ReferenceProps> | undefined>;
  getCharacterStories: (
    id: number
  ) => Promise<PayloadProps<ReferenceProps> | undefined>;
  limit: number;
  loading: boolean;
  loadingGetCharacter: boolean;
  loadingGetCharacterComics: boolean;
  loadingGetCharacterEvents: boolean;
  loadingGetCharacterSeries: boolean;
  loadingGetCharacterStories: boolean;
  orderBy: "name" | "modified" | "-name" | "-modified";
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setCharacters: React.Dispatch<React.SetStateAction<CharacterProps[]>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setOrderBy: React.Dispatch<
    React.SetStateAction<"name" | "modified" | "-name" | "-modified">
  >;
  total: number;
}

export const CharactersContext = createContext({} as CharactersContextProps);

interface Props {
  children: React.ReactNode;
}

function CharactersProvider({ children }: Props) {
  const [characters, setCharacters] = useState([] as CharacterProps[]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(25);
  const [loading, setLoading] = useState(false);
  const [loadingGetCharacter, setLoadingGetCharacter] = useState(false);
  const [loadingGetCharacterComics, setLoadingGetCharacterComics] =
    useState(false);
  const [loadingGetCharacterEvents, setLoadingGetCharacterEvents] =
    useState(false);
  const [loadingGetCharacterSeries, setLoadingGetCharacterSeries] =
    useState(false);
  const [loadingGetCharacterStories, setLoadingGetCharacterStories] =
    useState(false);
  const [orderBy, setOrderBy] = useState<
    "name" | "modified" | "-name" | "-modified"
  >("name");
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      setError(false);
      setLoading(true);

      try {
        const res: AxiosResponse<PayloadProps<CharacterProps>> = await api
          .get("/characters", {
            params: {
              ...api.defaults.params,
              limit: limit * 2,
            },
          })
          .then((res) => {
            setLoading(false);

            return res;
          });

        const payload = res.data;

        const characters = payload.data.results;
        const offset = payload.data.offset;
        const total = payload.data.total;

        setCharacters(() => {
          const newCharacters = Array<CharacterProps>(total);

          characters.forEach((character, i) => {
            newCharacters[offset + i] = new Character(character);
          });

          return newCharacters;
        });

        setTotal(total);
      } catch (err) {
        setError(true);
        setLoading(false);

        console.error(err);
      }
    })();
  }, []);

  const getCharacters = useCallback(
    async ({
      limit,
      nameStartsWith,
      offset,
      orderBy,
    }: {
      limit?: number;
      nameStartsWith?: string;
      offset?: number;
      orderBy?: "name" | "modified" | "-name" | "-modified";
    }) => {
      setError(false);
      setLoading(true);

      try {
        const res: AxiosResponse<PayloadProps<CharacterProps>> = await api
          .get("/characters", {
            params: {
              ...api.defaults.params,
              ...(limit && { limit }),
              ...(nameStartsWith && { nameStartsWith }),
              ...(offset && { offset }),
              ...(orderBy && { orderBy }),
            },
          })
          .then((res) => {
            setLoading(false);

            return res;
          });

        return res.data;
      } catch (err) {
        setError(true);
        setLoading(false);

        console.error(err);
      }
    },
    [characters]
  );

  const getCharacter = useCallback(async (id: number) => {
    setError(false);
    setLoadingGetCharacter(true);

    try {
      const res: AxiosResponse<PayloadProps<CharacterProps>> = await api
        .get(`/characters/${id}`, {
          params: {
            ...api.defaults.params,
          },
        })
        .then((res) => {
          setLoadingGetCharacter(false);

          return res;
        });

      return res.data;
    } catch (err) {
      setError(true);
      setLoadingGetCharacter(false);

      console.error(err);
    }
  }, []);

  const getCharacterComics = useCallback(async (characterId: number) => {
    setError(false);
    setLoadingGetCharacterComics(true);

    try {
      const res: AxiosResponse<PayloadProps<ReferenceProps>> = await api
        .get(`/characters/${characterId}/comics`, {
          params: {
            ...api.defaults.params,
          },
        })
        .then((res) => {
          setLoadingGetCharacterComics(false);

          return res;
        });

      return res.data;
    } catch (err) {
      setError(true);
      setLoadingGetCharacterComics(false);

      console.error(err);
    }
  }, []);

  const getCharacterEvents = useCallback(async (characterId: number) => {
    setError(false);
    setLoadingGetCharacterEvents(true);

    try {
      const res: AxiosResponse<PayloadProps<ReferenceProps>> = await api
        .get(`/characters/${characterId}/events`, {
          params: {
            ...api.defaults.params,
          },
        })
        .then((res) => {
          setLoadingGetCharacterEvents(false);

          return res;
        });

      return res.data;
    } catch (err) {
      setError(true);
      setLoadingGetCharacterEvents(false);

      console.error(err);
    }
  }, []);

  const getCharacterSeries = useCallback(async (characterId: number) => {
    setError(false);
    setLoadingGetCharacterSeries(true);

    try {
      const res: AxiosResponse<PayloadProps<ReferenceProps>> = await api
        .get(`/characters/${characterId}/series`, {
          params: {
            ...api.defaults.params,
          },
        })
        .then((res) => {
          setLoadingGetCharacterSeries(false);

          return res;
        });

      return res.data;
    } catch (err) {
      setError(true);
      setLoadingGetCharacterSeries(false);

      console.error(err);
    }
  }, []);

  const getCharacterStories = useCallback(async (characterId: number) => {
    setError(false);
    setLoadingGetCharacterStories(true);

    try {
      const res: AxiosResponse<PayloadProps<ReferenceProps>> = await api
        .get(`/characters/${characterId}/stories`, {
          params: {
            ...api.defaults.params,
          },
        })
        .then((res) => {
          setLoadingGetCharacterStories(false);

          return res;
        });

      return res.data;
    } catch (err) {
      setError(true);
      setLoadingGetCharacterStories(false);

      console.error(err);
    }
  }, []);

  return (
    <CharactersContext.Provider
      value={useMemo(
        () => ({
          characters,
          error,
          getCharacter,
          getCharacters,
          getCharacterComics,
          getCharacterEvents,
          getCharacterSeries,
          getCharacterStories,
          limit,
          loading,
          loadingGetCharacter,
          loadingGetCharacterComics,
          loadingGetCharacterEvents,
          loadingGetCharacterSeries,
          loadingGetCharacterStories,
          orderBy,
          search,
          setSearch,
          setCharacters,
          setLimit,
          setOrderBy,
          total,
        }),
        [
          characters,
          error,
          getCharacter,
          getCharacters,
          getCharacterComics,
          getCharacterEvents,
          getCharacterSeries,
          getCharacterStories,
          limit,
          loading,
          loadingGetCharacter,
          loadingGetCharacterComics,
          loadingGetCharacterEvents,
          loadingGetCharacterSeries,
          loadingGetCharacterStories,
          orderBy,
          search,
          setSearch,
          setCharacters,
          setLimit,
          setOrderBy,
          total,
        ]
      )}
    >
      {children}
    </CharactersContext.Provider>
  );
}

export default CharactersProvider;
