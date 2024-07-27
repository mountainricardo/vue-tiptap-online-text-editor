<template>
  <v-container
    tag="div"
    class="px-0"
    flex
    fluid
  >
    <docs-list
      :title="$t('nav.recent')"
      :documents="documents"
    ></docs-list>
  </v-container>
</template>

<script>
// import { mapActions } from 'vuex'

import DocsList from '@/components/docs-list.vue'
export default {
  name: 'Recent',
  components: {
    DocsList
  },
  props: [],
  data () {
    return {
    }
  },
  computed: {
    documents: {
      get: function () {
        return this.$store.state.folders.documents.filter((doc) => {
          const diff = this.$moment().diff(this.$moment(doc.created), 'hours')
          // if (!doc.archived && diff <= 24 * process.env.VUE_APP_RECENT_DAYS) {return doc} 
          if (diff <= 24 * process.env.VUE_APP_RECENT_DAYS) {return doc} 
          })
      }
    }
  },
  mounted () {},
  created () {},
  methods: {}
}
</script>

<style scoped lang="scss">
.recent {
}
</style>
