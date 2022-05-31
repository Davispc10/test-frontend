<template>
  <section class="card" :style="customStyle" @click="$emit('click')">
    <header class="card__header" v-if="showHeader || title">
      <h2 v-html="title" v-if="title" />
      <slot name="header" />
    </header>
    <section class="card__content">
      <slot name="content" />
    </section>
  </section>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    "add-spacing": {
      type: Boolean,
      required: false,
      default: () => false,
    },
    "show-header": {
      type: Boolean,
      required: false,
      default: () => false,
    },
    clicked: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    title: {
      type: String,
      required: false,
      default: () => "",
    },
    "max-width": {
      type: [Number, String],
      required: false,
      default: () => 1440,
    },
    "min-width": {
      type: [Number, String],
      required: false,
      default: () => 250,
    },
  },
  setup(props) {
    const customStyle = {
      "max-width": `${props.maxWidth}px`,
      "min-width": `${props.minWidth}px`,
    };
    if (props.clicked) {
      customStyle["cursor"] = "pointer";
    }
    if (props.addSpacing) {
      customStyle["padding"] = "20px";
    }
    return {
      customStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 8px;
  overflow-x: auto;

  display: flex;
  flex-direction: column;
  text-align: center;
  row-gap: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  transition: 0.5s;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    height: 100%;
    max-height: 70px;
    font: 500 1rem "Poppins", sans-serif;
  }
  &__content {
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    column-gap: 8px;
    * input,
    button,
    span {
      font: 600 1.2rem "Poppins", sans-serif;
    }
  }
}
</style>
