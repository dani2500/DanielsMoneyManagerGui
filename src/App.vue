<template>
  <NavBar />
  <TheLoader v-if="showLoading"></TheLoader>
  <ToastMessage></ToastMessage>
  <router-view />
</template>

<script>
  import { mapGetters } from 'vuex';
  import NavBar from './components/NavBar.vue';
  import TheLoader from './components/TheLoader.vue';
  import ToastMessage from './components/ToastMessage.vue';
  import { AUTH_MODULE, AUTO_LOGIN_ACTION, GET_LOADING_SPINNER_SHOW_GETTER} from './store/storeconstants';

  export default {
    name: 'App',
    components: {
      NavBar,
      TheLoader,
      ToastMessage,
    },
    computed: {
        ...mapGetters({
            showLoading: GET_LOADING_SPINNER_SHOW_GETTER,
        }),
    },
    created() {
        this.$store.dispatch(`${AUTH_MODULE}/${AUTO_LOGIN_ACTION}`);
    },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.customize-table {
  --easy-table-border: 1px solid transparent;
  --easy-table-row-border: 1px solid #adb5bd;

  --easy-table-header-font-size: 16px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: black;
  --easy-table-header-background-color: transparent;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: black;
  --easy-table-body-even-row-background-color: #e9ecef;

  --easy-table-body-row-font-color: black;
  --easy-table-body-row-background-color: transparent;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 16px;

  --easy-table-body-row-hover-font-color: white;
  --easy-table-body-row-hover-background-color: #5DADE2;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: transparent;
  --easy-table-footer-font-color: black;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;


  --easy-table-scrollbar-track-color: black;
  --easy-table-scrollbar-color: black;
  --easy-table-scrollbar-thumb-color: black;;
  --easy-table-scrollbar-corner-color: black;

  --easy-table-loading-mask-background-color: black;
}
</style>
