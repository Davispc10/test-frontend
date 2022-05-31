<template>
  <section class="hero">
    <default-card show-header add-spacing>
      <template v-slot:header>
        <v-spacer></v-spacer>
        <v-btn color="red" to="/home"><v-icon>mdi-home</v-icon>Home</v-btn>
      </template>

      <template v-slot:content>
        <section class="hero__infos">
          <img :src="renderImage(hero.thumbnail)" alt="" />
          <section>
            <h2 class="hero__infos__title">{{ hero.name }}</h2>
            <p class="hero__infos__description">
              {{ hasDescription(hero) }}
            </p>
          </section>
        </section>
        <section class="hero__comics">
          <h2>Comics</h2>
          <section class="hero__comics__infos">
            <default-card
              v-for="(item, index) in comics"
              :key="index"
              max-width="300"
              min-width="300"
              show-header
            >
              <template v-slot:header>
                <h4>{{ item.title }}</h4>
              </template>
              <template v-slot:content>
                <img :src="renderImage(item.thumbnail)" loading="lazy" />
              </template>
            </default-card>
          </section>
        </section>
      </template>
    </default-card>
  </section>
</template>

<script>
import { computed, defineComponent, reactive } from "@vue/composition-api";
import { renderImage } from "@/utils/imageHelper";

function hasDescription(hero) {
  return hero.description.trim().length
    ? hero.description
    : "description not informed.";
}

export default defineComponent({
  components: {
    DefaultCard: () => import("@/components/Card/Card.vue"),
  },
  setup(_, { root }) {
    const $store = root.$store;
    const $route = root.$route;
    $store.dispatch("getCharacterById", $route.params.id);
    $store.dispatch("getComics", $route.params.id);

    const state = reactive({});
    const hero = computed(() => $store.getters.hero);
    const comics = computed(() => $store.getters.comics);

    return { state, hero, hasDescription, renderImage, comics };
  },
});
</script>

<style lang="scss" scoped>
* {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
}

.hero {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__infos {
    display: flex;
    column-gap: 20px;
    row-gap: 20px;
    text-align: left;
    height: 50%;
    padding: 10px;

    & img {
      max-height: 400px;
      max-width: 400px;
      border-radius: 5px;
    }

    & section {
      row-gap: 10px;
    }
  }

  &__comics {
    width: 100%;
    height: 50%;
    padding: 10px;

    display: flex;
    flex-direction: column;

    h2 {
      text-align: left;
    }

    img {
      height: 90%;
      width: 100%;
      object-fit: contain;
    }

    &__infos {
      width: 100%;
      height: 100%;
      overflow-x: auto;
      display: flex;
      column-gap: 20px;
      padding: 10px;
    }
  }
}
</style>
