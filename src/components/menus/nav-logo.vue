<template>
  <v-list max-width="95%">
    <v-list-item class="mr-0 px-0">
      <!-- <v-list-item-icon v-if="!isMini()"> -->
      <!-- <v-list-item-icon v-if="mini">
            <v-img
              :src="require('@/assets/img/logo-sm.png')"
            ></v-img>
          </v-list-item-icon> -->
      <!-- <v-list-item-content v-else> -->
      <v-list-item-content>
        <v-img
          v-if="dark"
          :src="require('@/assets/img/logo.png')"
          max-width="100%"
          class="d-flex"
        ></v-img>
        <v-img
          v-else
          :src="require('@/assets/img/logo.png')"
          max-width="100%"
          class="d-flex"
        ></v-img>
        <!-- <v-icon  @click="drawer = !drawer">mdi-menu</v-icon> -->
      </v-list-item-content>
      <!-- <v-list-item>
          <v-list-item-icon>
            <v-icon
              v-if="mini"
              v-text="'icon-close'"
              @click.stop="mini = !mini"
            ></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
          </v-list-item-content>
          </v-list-item> -->
    </v-list-item>
  </v-list>
</template>

<script lang="js">
import { mapState } from 'vuex'

export default {
  name: 'NavLogo',
  props: [],
  data () {
    return {

    }
  },
  computed:
    mapState({
      dark: state => state.theme.dark
      // logged: state => state.account.status.loggedIn
    }),
  mounted () {

  },
  methods: {

  }
}

</script>

<style scoped lang="scss">
.nav-logo {
}
</style>
