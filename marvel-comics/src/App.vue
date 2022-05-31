<template>
  <div id="app">
    <notification />
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
  components: {
    DefaultHeader: () => import("@/components/Header/Header.vue"),
    Notification: () => import("@/components/Notification/Notification.vue"),
  },
});
</script>

<style lang="scss">
@import "@/scss/_global.scss";

#app {
  display: flex;
  flex-direction: column;

  & .app__content {
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow-y: scroll;
  }
}
</style>
