import Vue from "vue";
import Vuex from "vuex";

import * as Types from "@/types";
Vue.use(Vuex);

import Notification from "./modules/Notification";

import {
  getCharacters,
  getCharactersByName,
  getCharacterById,
  getComic,
} from "@/services/modules/characters";

export default new Vuex.Store<Types.State>({
  modules: {
    Notification,
  },
  state: {
    selectedCharacter: {
      id: 0,
      name: "",
      description: "",
      modified: "",
      resourceUri: "",
      thumbnail: {
        path: "",
        extension: "",
      },
    },
    charactersList: [],
    tempList: [],
    comics: {},
    offset: 0,
    limit: 8,
  },
  mutations: {
    setSelectedCharacter(state, character: Types.Characters) {
      state.selectedCharacter = character;
    },
    resetSelectedCharacter(state) {
      state.selectedCharacter = {
        id: 0,
        name: "",
        description: "",
        modified: "",
        resourceUri: "",
        thumbnail: {
          path: "",
          extension: "",
        },
      };
    },
    setCharactersList(state, list: Types.Characters[]) {
      state.charactersList.push(...list);
    },
    setTempList(state, list: Types.Characters[]) {
      state.tempList = list;
    },
    updateOffset(state) {
      state.offset += state.limit;
    },
    setComic(state, comic) {
      state.comics = comic;
    },
    resetComics(state) {
      state.comics = {};
    },
  },
  getters: {
    characters: (state) => {
      if (state.tempList.length) {
        return state.tempList;
      } else {
        return state.charactersList;
      }
    },
    hero: (state) => state.selectedCharacter,
    comics: (state) => state.comics.results,
  },
  actions: {
    async getCharacters({ state, commit }) {
      return await getCharacters(state.offset, state.limit).then(
        async (res: Types.CharactersList) => {
          await commit("setCharactersList", res.results);
          await commit("updateOffset");
          return res;
        }
      );
    },
    async getCharactersByName({ state, commit }, name) {
      return await getCharactersByName(name).then(
        async (res: Types.CharactersList) => {
          await commit("setTempList", res.results);
          return res;
        }
      );
    },
    async getCharacterById({ commit }, id) {
      return await getCharacterById(id).then(
        async (res: Types.CharactersList) => {
          await commit("setSelectedCharacter", res.results[0]);
          return res;
        }
      );
    },
    async getComics({ commit }, id) {
      return await getComic(id).then(async (res) => {
        await commit("setComic", res);
        return res;
      });
    },
  },
});
