<template>
  <v-container
    tag="div"
    class="px-0"
    flex
    fluid
  >
    <docs-list
      :title="$t('nav.archived')"
      :documents="documents"
    ></docs-list>
  </v-container>
</template>

<script lang="js">
import DocsList from '@/components/docs-list.vue'

export default {
  name: 'Archived',
  components: {
    DocsList
  },
  props: [],
  data () {
    return {

    }
  },
  computed: {
    documents:{
      get: function () {
        return this.$store.state.folders.archivedDocuments
      }
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
  .archived {

  }
</style>
