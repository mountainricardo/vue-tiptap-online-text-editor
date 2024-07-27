<template>
  <section class="app-bar-btns">
    <!-- <notification-menu v-if="logged"/> -->

    <user-menu
      v-if="logged"
      :dark="dark"
    ></user-menu>
  </section>
</template>

<script lang="js">
import { mapState } from 'vuex'
import UserMenu from '@/components/menus/user-menu.vue'
// import NotificationMenu from '@/components/menus/notification-menu.vue'

export default {
  name: 'AppBarBtns',
  components: {
    UserMenu
    // NotificationMenu,
  },
  props: [],
  data () {
    return {

    }
  },
  computed:
    mapState({
      dark: state => state.theme.dark,
      logged: state => state.account.status.loggedIn
    }),
  mounted () {

  },
  methods: {

  }
}

</script>

<style scoped lang="scss">
  .app-bar-btns {

  }
</style>
