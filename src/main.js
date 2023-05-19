import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'



const app = createApp(App);
app.use(store).use(router).use(VueChartkick).mount("#app");
app.component('EasyDataTable', Vue3EasyDataTable);

