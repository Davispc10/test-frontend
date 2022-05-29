<template>
	<div id="app">
		<default-header />
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
}
</style>
