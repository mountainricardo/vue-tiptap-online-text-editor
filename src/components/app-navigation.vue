<template>
  <v-navigation-drawer
    v-model="drawer"
    value="drawer"
    class="app-navigation"
    app
  >
    <template v-slot:prepend>
      <v-container class="pl-10">
        <v-row align="start">
          <v-col
            cols="12"
            class="pr-0 mr-0"
          >
            <nav-logo />
          </v-col>
          <!-- <v-col
            cols="2"
            class="ml-0 px-0"
          >
            <v-btn
              v-if="$vuetify.application.left === 0"
              icon
              @click="changeDrawer()"
            >
              <v-icon small>
                icon-close
              </v-icon>
            </v-btn>
          </v-col> -->
        </v-row>
      </v-container>
    </template>

    <template v-slot:default>
      <div class="pl-7">
        <nav-menu-documents></nav-menu-documents>

        <v-divider></v-divider>

        <nav-menu-folders></nav-menu-folders>
      </div>
    </template>

    <!-- <template v-slot:append>
        <nav-workspace-management/>
      </template> -->
  </v-navigation-drawer>
</template>

<script lang="js">
import NavMenuDocuments from '@/components/menus/nav-menu-documents.vue'
import NavMenuFolders from '@/components/menus/nav-menu-folders.vue'
import NavLogo from '@/components/menus/nav-logo.vue'
// import NavWorkspaceManagement from '@/components/menus/nav-workspace-management.vue'
export default {
  name: 'AppNavigation',
  components: {
    NavMenuDocuments,
    NavMenuFolders,
    NavLogo
    // NavWorkspaceManagement
  },
  props: {

  },
  data () {
    return {
    }
  },
  computed: {
    drawer: {
      // getter
      get: function () {
        return this.$store.state.nav.drawer
      },
      // setter
      set: function (newValue) {
        this.$store.commit('changeDrawer', newValue)
      }
    }
  },
  mounted () {
    // console.log('initial mounted $vuetify.application App service', this.$vuetify.application)
  },
  updated () {
    // console.log('updated $vuetify.application App service', this.$vuetify.application)
  },
  methods: {
    changeDrawer () {
      this.$store.commit('changeDrawer', !this.$store.state.nav.drawer)
    }
  }
}
</script>

<style scoped lang="scss">
.app-navigation {
  //
}
</style>
