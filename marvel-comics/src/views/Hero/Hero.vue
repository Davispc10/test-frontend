<template>
  <section class="hero">
    <default-card> </default-card>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";

export default defineComponent({
  components: {
    DefaultCard: () => import("@/components/Card/Card.vue"),
  },
  setup(_, { root }) {
    const $store = root.$store;
    const state = reactive({});
    return { state };
  },
});
</script>

<style lang="scss" scoped>
.hero {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
</style>
