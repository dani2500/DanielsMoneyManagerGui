<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand">Daniels Money Manager</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/signup">Signup</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" to="/user">User</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              v-if="isAuthenticated"
            >
              Cash Actions
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" style="margin: 0 auto">
              <li class="dropdown-item">
                <router-link class="nav-link" to="/categories"
                  >Categories</router-link
                >
              </li>
              <li class="dropdown-item">
                <router-link class="nav-link" to="/cash_actions"
                  >Cash Actions</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              v-if="isAuthenticated"
            >
              Funds
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" style="margin: 0 auto">
              <li class="dropdown-item">
                <router-link class="nav-link" to="/funds"
                  >Funds</router-link
                >
              </li>
              <li class="dropdown-item">
                <router-link class="nav-link" to="/fund_actions"
                  >Fund Actions</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <a href="#" class="nav-link" @click.prevent="onLogout()">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  IS_USER_AUTHENTICATED_GETTER,
  LOGOUT_ACTION,
  AUTH_MODULE,
} from "../store/storeconstants";

export default {
  computed: {
    ...mapGetters("auth", {
      isAuthenticated: IS_USER_AUTHENTICATED_GETTER,
    }),
  },
  methods: {
    ...mapActions(AUTH_MODULE, {
      Logout: LOGOUT_ACTION,
    }),
    onLogout() {
      this.Logout();
      this.$router.replace("/");
    },
  },
};
</script>
