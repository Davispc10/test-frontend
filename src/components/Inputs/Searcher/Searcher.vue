<template>
  <section class="searcher">
    <input
      class="searcher__field"
      type="text"
      :placeholder="placeholder"
      v-model="state.valueToSearch"
      @input="() => searchCharacter()"
    />
    <button class="searcher__button" @click="() => searchCharacter()">
      <span class="mdi mdi-magnify" />
    </button>
  </section>
</template>

<script>
import { defineComponent, reactive } from "@vue/composition-api";

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      required: true,
      default: () => "Pesquise aqui...",
    },
  },
  setup(_, { root }) {
    const $store = root.$store;
    const state = reactive({
      valueToSearch: null,
    });

    async function searchCharacter() {
      if (!state.valueToSearch.length) {
        $store.commit("setTempList", []);
        $store.dispatch("showNotification", {
          text: "Lista de herois reiniciada!",
          color: "blue",
        });
        return;
      }
      await $store.dispatch("getCharactersByName", state.valueToSearch);
    }

    return {
      state,
      searchCharacter,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
.searcher {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__field {
    width: 100%;
    max-width: 300px;
    line-height: 30px;
    font: 500 25px "Poppins", sans-serif;
    transition: 200ms;
    border-radius: 5px;
    padding: 5px;
    border: 2px solid $primary;
    outline: none;
    background: white;

    &:focus {
      border: 2px solid $primary;
    }

    @media (max-width: 600px) {
      max-width: 500px;
    }
  }

  &__button {
    width: 30px;
    height: 30px;
    padding: 0 10px;
    color: white;
    background: transparent;
    border: none;
    outline: none;

    cursor: pointer;
    transition: 200ms;

    &:hover {
      transform: scale3d(1.2, 1.2, 1.2);
    }

    & span {
      width: 100%;
      height: 100%;
      font-size: 30px;
    }
  }
}
</style>
