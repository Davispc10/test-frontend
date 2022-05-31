<template>
  <button @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Button",
});
</script>

<style lang="scss" scoped></style>
