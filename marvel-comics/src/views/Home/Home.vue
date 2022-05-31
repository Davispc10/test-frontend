<template>
  <section class="home">
    <section class="home__searcher">
      <searcher placeholder="Pesquise pelo nome de um personagem." />
    </section>
    <section class="home__characters">
      <default-card
        v-for="(hero, index) in characters"
        :key="index"
        max-width="300"
        @click="$router.push(`/hero/${hero.id}`)"
        :clicked="true"
      >
        <template v-slot:content>
          <section class="home__characters__content">
            <img :src="renderImage(hero.thumbnail)" loading="lazy" />
            <h3 class="hero__name">{{ hero.name }}</h3>
          </section>
        </template>
      </default-card>
    </section>
    <v-btn
      @click="() => init()"
      class="justify-center"
      :loading="state.isLoading"
      v-if="characters.length"
      >Carregar mais</v-btn
    >
  </section>
</template>

<script>
import { defineComponent, reactive, computed } from "@vue/composition-api";
import { renderImage } from "@/utils/imageHelper";

export default defineComponent({
  components: {
    DefaultCard: () => import("@/components/Card/Card.vue"),
    Searcher: () => import("@/components/Inputs/Searcher/Searcher.vue"),
  },
  setup(_, { root }) {
    const $store = root.$store;
    const state = reactive({
      characters: $store.getters.characters,
      isLoading: false,
    });

    const characters = computed(() => $store.getters.characters);

    async function init() {
      state.isLoading = true;
      await $store
        .dispatch("getCharacters")
        .then(() => (state.isLoading = false));
    }

    init();

    return {
      init,
      state,
      characters,
      renderImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  row-gap: 20px;

  &__searcher {
    height: 100%;
    max-height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
  }

  &__characters {
    height: 100%;
    width: 100%;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    row-gap: 30px;
    column-gap: 30px;

    @media (max-width: 1350px) {
      grid-template-columns: 1fr 1fr;

      @media (max-width: 1000px) {
        grid-template-columns: 1fr;
      }
    }

    &__content {
      max-width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      column-gap: 10px;

      img {
        width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
      .hero__name {
        text-align: left;
        padding: 20px;
      }
    }
  }
}
</style>
