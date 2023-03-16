<template>
  <NavBar />
  <TheLoader v-if="showLoading"></TheLoader>
  <router-view />
</template>

<script>
  import { mapState } from 'vuex';
  import NavBar from './components/NavBar.vue';
  import TheLoader from './components/TheLoader.vue';
  import { AUTH_MODULE, AUTO_LOGIN_ACTION } from './store/storeconstants';

  export default {
    name: 'App',
    components: {
      NavBar,
      TheLoader,
    },
    computed: {
        ...mapState({
            showLoading: (state) => state.showLoading,
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
</style>
