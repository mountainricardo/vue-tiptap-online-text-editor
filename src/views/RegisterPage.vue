<template>
  <div class="d-flex justify-center">
    <form @submit.prevent="handleSubmit">
      <v-card
        width="100%"
        md-width="600"
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
                {{ $t('account.register-form.register') }}
              </h2>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="d-flex">
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="user.firstName"
                :label="$t('account.register-form.first-name')"
                persistent-hint
                flat
                background-color="grey lighten-3"
                filled
                shaped
                outlined
                name="firstName"
                class="form-control"
                :class="{ 'is-invalid': submitted && !user.firstName }"
                tabindex="1"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="user.lastName"
                :label="$t('account.register-form.last-name')"
                persistent-hint
                flat
                background-color="grey lighten-3"
                filled
                shaped
                outlined
                name="lastName"
                class="form-control"
                :class="{ 'is-invalid': submitted && !user.lastName }"
                tabindex="2"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="user.username"
                :label="$t('account.register-form.username')"
                persistent-hint
                flat
                background-color="grey lighten-3"
                filled
                shaped
                outlined
                name="username"
                class="form-control"
                :class="{ 'is-invalid': submitted && !user.username }"
                tabindex="3"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="user.password"
                v-validate="{ required: true, min: 6 }"
                :label="$t('account.register-form.pwd')"
                persistent-hint
                flat
                background-color="grey lighten-3"
                filled
                shaped
                outlined
                type="password"
                name="password"
                class="form-control"
                :class="{ 'is-invalid': submitted && !user.password }"
                tabindex="4"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="user.email"
                :label="$t('account.register-form.email')"
                persistent-hint
                flat
                background-color="grey lighten-3"
                filled
                shaped
                outlined
                name="email"
                class="form-control"
                :class="{ 'is-invalid': submitted && !user.email }"
                tabindex="5"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="user.phone"
                :label="$t('account.register-form.phone')"
                persistent-hint
                flat
                background-color="grey lighten-3"
                filled
                shaped
                outlined
                name="phone"
                class="form-control"
                :class="{ 'is-invalid': submitted && !user.phone }"
                tabindex="6"
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
                tabindex="7"
              >
                {{ $t('account.register-form.register') }}
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <router-link
                to="/login"
                class="text-none"
                tabindex="8"
                v-html="$t('account.register-form.cancel')"
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
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      submitted: false
    }
  },
  computed: {
    ...mapState('account', ['status'])
  },
  methods: {
    ...mapActions('account', ['register']),
    handleSubmit () {
      console.log('new user', JSON.stringify(this.user))
      this.submitted = true
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.register(this.user)
        }
      })
    }
  }
}
</script>
