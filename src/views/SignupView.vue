<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h3>Signup</h3>
          <hr />
        </div>
        <form @submit.prevent="onSignup()">
          <div class="form-group">
            <label>User Name</label>
            <input type="text" class="form-control" v-model.trim="username" />
            <div class="error" v-if="errors.username">
              {{ errors.username }}
            </div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" v-model.trim="email" />
            <div class="error" v-if="errors.email">
              {{ errors.email }}
            </div>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              v-model.trim="password"
            />
            <div class="error" v-if="errors.password">
              {{ errors.password }}
            </div>
          </div>

          <div class="my-3">
            <button type="submit" class="btn btn-primary">Signup</button>
          </div>
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SignupValidations from "../services/SignupValidations";
import { mapActions  } from "vuex";
import { SIGNUP_ACTION, AUTH_MODULE } from '../store/storeconstants';

export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
      errors: [],
      error: "",
    };
  },
  methods: {
    ...mapActions(AUTH_MODULE, {
            Signup: SIGNUP_ACTION,
    }),
    async onSignup() {
        this.error = "";

        let validations = new SignupValidations(
            this.email,
            this.password //Validate username
        );
        this.errors = validations.checkValidations();
        if ("email" in this.errors || "password" in this.errors) {
            return false;
        }

        try {
            await this.Signup({
            username: this.username,
            email: this.email,
            password: this.password,
            })
            
            this.$router.push('/');
        } catch (e) {
                this.error = e;
        }
    },
  },
};
</script>
