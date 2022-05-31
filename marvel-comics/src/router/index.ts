import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home/Home.vue"),
    beforeEnter: (_to, _from, next) => {
      Store.commit("resetSelectedCharacter");
      Store.commit("resetComics");
      next();
    },
  },
  {
    path: "/hero/:id?",
    name: "Hero",
    component: () => import("@/views/Hero/Hero.vue"),
  },
  {
    path: "/",
    redirect: {
      name: "Home",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
