<template>
  <div id="app">
    <default-header />
    <section class="app__content">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  components: { DefaultHeader: () => import("@/components/Header/Header.vue") },
});
</script>

<style lang="scss">
@import "@/scss/_global.scss";

#app {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  & .app__content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
