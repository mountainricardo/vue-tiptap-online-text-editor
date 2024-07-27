<template>
  <v-menu
    offset-y
    bottom
    left
    rounded="lg"
    content-class="user-menu"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        elevation="0"
        medium
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          color="primary"
          v-text="'icon-account-filled'"
        ></v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="(u, index) in user"
          :key="index"
          :disabled="u.disabled"
        >
          <v-divider
            v-if="u.text === 'divider'"
            :key="index"
          ></v-divider>

          <template v-else-if="u.text === 'user.account'">
            <v-list-item-icon>
              <v-icon v-text="u.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content
              id="account-dialog-activator"
              :key="index"
              @click="openAccountSettingsDialog()"
              v-text="$t(u.text)"
            ></v-list-item-content>
          </template>

          <template v-else-if="u.text === 'user.night-mode'">
            <v-list-item-icon>
              <v-icon v-text="dark ? 'icon-sun' : u.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content
              id="theme-activator"
              :key="index"
              @click.stop="changeTheme()"
              v-text="dark ? $t('user.day-mode') : $t(u.text)"
            ></v-list-item-content>
          </template>

          <template v-else-if="u.text === 'user.signout'">
            <v-list-item-icon>
              <v-icon v-text="u.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content
              id="theme-activator"
              :key="index"
              @click="logoutApp()"
              v-text="$t(u.text)"
            ></v-list-item-content>
          </template>

          <template v-else>
            <v-list-item-icon>
              <v-icon v-text="u.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content
              :key="index"
              v-text="$t(u.text)"
            ></v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="js">
import { mapState, mapActions } from 'vuex'
export default {
  name: 'UserMenu',
  props: [],
  data () {
    return {
      // dark: false,
      user: [
        {
          icon: 'icon-account',
          text: 'user.account',
          disabled: false,
          href: ''
        },
        {
          icon: 'icon-moon-and-stars',
          text: 'user.night-mode',
          disabled: false,
          href: ''
        },
        {
          icon: 'divider',
          text: 'divider',
          disabled: true,
          href: ''
        },
        {
          icon: 'icon-binoculars',
          text: 'user.report-bug',
          disabled: true,
          href: ''
        },
        {
          icon: 'icon-answers',
          text: 'user.request-feature',
          disabled: true,
          href: ''
        },
        {
          icon: 'icon-available-updates',
          text: 'user.changelog',
          disabled: true,
          href: ''
        },
        {
          icon: 'divider',
          text: 'divider',
          disabled: true,
          href: ''
        },
        {
          icon: 'icon-idea',
          text: 'user.introduction',
          disabled: true,
          href: ''
        },
        {
          icon: 'icon-lifebuoy',
          text: 'user.help',
          disabled: true,
          href: ''
        },
        {
          icon: 'icon-study',
          text: 'user.legal-info',
          disabled: true,
          href: ''
        },
        {
          icon: 'divider',
          text: 'divider',
          disabled: true,
          href: ''
        },
        {
          icon: 'icon-sign-out',
          text: 'user.signout',
          disabled: false,
          href: ''
        }
      ]
    }
  },
  computed:
    // ...mapState('account', ['status'])
    mapState({
      dark: state => state.theme.dark
      // logged: state => state.account.status.loggedIn
    }),
  mounted () {
  },
  methods: {
    openAccountSettingsDialog () {
      this.$store.commit('openAccountSettingsDialog', true)
    },
    changeTheme () {
      this.$store.commit('changeTheme', !this.$store.state.theme.dark)
      this.$vuetify.theme.dark = this.$store.state.theme.dark
    },
    ...mapActions('account', ['logout']),
    logoutApp () {
      this.logout()
      location.reload(true)
    }
  }
}

</script>

<style scoped>
.user-menu {
  .v-list {
    padding: .62em;
  }
}

.user-menu{
  border-radius:.62em;
}
.user-menu .v-list {
    padding: .62em;
    border: 1px solid #e4e4e4;
}
.user-menu .v-list >>> .v-list-item.v-list-item--link{
  margin-top: .3em;
}
.user-menu .v-list >>> .v-list-item.v-list-item--link:before{
  border-radius: .44em!important;
}
</style>
