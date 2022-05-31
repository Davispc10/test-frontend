import * as Types from "@/types";
import { Commit, Mutation } from "vuex";

export default {
  state: () => ({
    color: "",
    text: "",
    status: false,
  }),
  mutations: {
    showNotification(
      state: Types.NotificationState,
      notification: Types.NotificationState
    ) {
      state.status = true;
      state.text = notification.text;
      state.color = notification.color;
    },
    closeNotification(state: Types.NotificationState) {
      state.status = false;
      state.text = "";
      state.color = "";
    },
  },
  actions: {
    showNotification(
      { commit }: { commit: Commit },
      payload: Types.NotificationState
    ): void {
      console.log(payload);

      commit("showNotification", payload);
    },
  },
  getters: {
    notification: (state: Types.NotificationState) => state,
  },
};
