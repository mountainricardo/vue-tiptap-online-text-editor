<template>
  <v-badge
    color="rgb(256, 0, 0)"
    content="5"
    overlap
    class="notification-menu"
  >
    <v-btn icon>
      <!-- mdi -->
      <!-- <v-icon>mdi-email-outline</v-icon> -->
      <!-- md -->
      <!-- <v-icon>mail_outline</v-icon> -->
      <!-- icomoon -->
      <v-icon>icon-notification</v-icon>
    </v-btn>
  </v-badge>
</template>

<script lang="js">

export default {
  name: 'NotificationMenu',
  props: [],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {

  }
}

</script>

<style scoped lang="scss">
.notification-menu {
}
</style>
