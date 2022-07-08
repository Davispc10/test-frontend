<template>
  <v-snackbar v-model="notification.status">
    {{ notification.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="indigo"
        text
        v-bind="attrs"
        @click="$store.commit('closeNotification')"
      >
        fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { computed, defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup(_, { root }) {
    const $store = root.$store;
    const notification = computed(() => $store.getters.notification);
    return { notification };
  },
});
</script>
