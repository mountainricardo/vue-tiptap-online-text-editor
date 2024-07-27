<template>
  <section class="nav-menu">
    <v-list
      nav
      dense
    >
      <v-list-item-group v-model="selectedDocument">
        <v-list-item
          v-for="(view, i) in views"
          :key="i"
          :disabled="view.disabled"
          class="side-nav"
        >
          <router-link
            :to="view.href"
            class="d-flex"
          >
            <v-list-item-icon>
              <v-icon v-text="view.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content v-text="$t(view.text)">
            </v-list-item-content>
          </router-link>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </section>
</template>

<script lang="js">
export default {
  name: 'NavMenuDocuments',
  props: {},
  data () {
    return {
      views: [
        {
          icon: 'icon-clock',
          text: 'nav.recent',
          href: '/recent',
          disabled: false,
        },
        {
          icon: 'icon-document',
          text: 'nav.documents',
          href: '/documents',
          disabled: false,
        },
        {
          icon: 'icon-star',
          text: 'nav.templates',
          href: '/templates',
          disabled: false,
        },
        {
          icon: 'icon-box',
          text: 'nav.archived',
          href: '/archived',
          disabled: false,
        }
      ]

    }
  },
  computed: {
    selectedDocument: {
      get: function () {
        return this.$store.state.nav.selectedDocument
      },
      set: function (newValue) {
        this.$store.commit('selectDocuments', newValue)
      }
    }
  },
  mounted () {},
  methods: {}

}

</script>

<style scoped lang="scss">
.nav-menu {
}
</style>
