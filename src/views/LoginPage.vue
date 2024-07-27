<template>
  <div class="d-flex justify-center">
    <form @submit.prevent="handleSubmit">
      <v-card
        width="100%"
        align-self="center"
        flat
      >
        <v-card-title class="d-flex">
          <v-row>
            <v-col>
              <h2
                cols="12"
                class="headline"
              >
                {{ $t("account.login-form.login") }}
              </h2>
              <p
                cols="12"
                class="caption text--primary"
                v-html="$t('account.login-form.desc')"
              ></p>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="d-flex">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                :label="$t('account.login-form.email')"
                persistent-hint
                flat
                background-color="grey lighten-3"
                filled
                shaped
                outlined
                name="email"
                class="form-control"
                :class="{ 'is-invalid': submitted && !email }"
                tabindex="1"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                :label="$t('account.login-form.pwd')"
                persistent-hint
                flat
                background-color="grey lighten-3"
                filled
                shaped
                outlined
                type="password"
                name="password"
                class="form-control"
                :class="{ 'is-invalid': submitted && !password }"
                tabindex="2"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex">
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-btn
                color="primary"
                rounded
                large
                block
                class="text-none"
                elevation="0"
                type="submit"
                tabindex="3"
              >
                {{ $t("account.login-form.login") }}
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <router-link
                to="/register"
                class="text-none"
                tabindex="4"
                v-html="$t('account.login-form.register')"
              >
              </router-link>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
      <!-- TODO form validations and alerts/hints/toast or whatever -->
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
    };
  },
  computed: {},
  created() {
    // reset login status
    this.logout();
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
    handleSubmit() {
      this.submitted = true;
      const { email, password } = this;
      if (email && password) {
        this.login({ email, password });
      }
    },
  },
};
</script>
