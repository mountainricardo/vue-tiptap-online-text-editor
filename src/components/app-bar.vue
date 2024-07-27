<template>
  <v-app-bar
    v-show="logged"
    app
    flat
    prominent
    class="elevation-0"
    extended
    extension-height="auto"
    :color="`${(!dark)? 'white': null}`"
  >
    <v-container
      tag="div"
    >
      <v-row justify="space-between">
        <!-- <v-col cols="1">
          <v-app-bar-nav-icon
            v-if="!this.$store.state.nav.drawer"
            @click="changeDrawer()"
          >
            <v-icon>menu</v-icon>
          </v-app-bar-nav-icon>
        </v-col>

        <v-spacer></v-spacer> -->

        <v-col cols="8 ml-14">
          <v-toolbar-title>
            <div>
              <span
                v-if="user && user.message"
                class="waving-hand"
                v-html="$t('main.message', {name: $store.state.account.user.message.slice(13)})"
              ></span>
            </div>
          </v-toolbar-title>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="2">
          <app-bar-btns class="mt-4"></app-bar-btns>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="js">
import AppBarBtns from '@/components/menus/app-bar-btns.vue'

export default {
  name: 'AppBar',
  components: {
    AppBarBtns
  },
  props: [],
  data () {
    return {

    }
  },
  computed: {
    dark: {
      get: function () {
        return this.$store.state.theme.dark
      }
    },
    logged: {
      get: function () {
        return this.$store.state.account.status.loggedIn
      }
    },
    drawer: {
      get: function () {
        return this.$store.state.nav.drawer
      }
    },
    user: {
      get: function () {
        return this.$store.state.account.user
      }
    }
  },
  mounted () {

  },
  methods: {
    changeDrawer () {
      this.$store.commit('changeDrawer', !this.$store.state.nav.drawer)
    }
  }

}

</script>

<style scoped lang="scss">
.v-toolbar {
  &::v-deep .waving-hand {
    font-family: proxima-nova;
    &:after{
      content: '\1F44B';
      margin-left:.3em;
      width: 15px;
      font-size: 2.5rem;
    }
    .hi-you {
      font-size: 1.125rem
    }
    .welcome {
      font-size: 2.5rem;
    }
  }
}
</style>
