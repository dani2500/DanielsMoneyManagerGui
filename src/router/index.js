import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import UserView from "../views/UserView.vue";
import store from '../store/index';
import { AUTH_MODULE, IS_USER_AUTHENTICATED_GETTER } from '../store/storeconstants';


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { auth: false },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { auth: false },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
    meta: { auth: false },
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    meta: { auth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if ('auth' in to.meta && to.meta.auth && !store.getters[`${AUTH_MODULE}/${IS_USER_AUTHENTICATED_GETTER}`]) {
      next('/login');
  } 
  else {
      next();
  }
});

export default router;
