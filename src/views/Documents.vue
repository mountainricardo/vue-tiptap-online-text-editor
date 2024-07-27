<template>
  <v-container
    tag="div"
    class="px-0"
    flex
    fluid
  >
    <docs-list
      :title="$t('nav.documents')"
      :documents="documents"
    ></docs-list>
  </v-container>
</template>

<script lang="js">
import DocsList from '@/components/docs-list.vue'
export default {
  name: 'Documents',
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
        return this.$store.state.folders.documents
      }
    }
},
  mounted () {

  },
  created () {
  },
  methods: {

  }
}
</script>
