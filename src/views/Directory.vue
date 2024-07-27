/* eslint-disable vue/no-v-html */
<template>
  <v-container
    tag="div"
    class="px-0"
    flex
    fluid
  >
    <docs-list
      :title="`${(selected !== null && directory)? directory.name: $t('nav.select-folder')}`"
      :documents="documents"
    ></docs-list>
  </v-container>
</template>

<script lang="js">
import DocsList from '@/components/docs-list.vue'

export default {
  name: 'Directory',
  components: {
    DocsList
  },
  props: [],
  data () {
    return {
    }
  },
  computed: {
    user: {
      get: function () {
        return this.$store.state.account.user
      }
    },
    workspace: {
      get: function () {
        return this.$store.state.folders.workspaces[0]
      }
    },
    selected: {
      get: function () {
        return (this.$store.state.nav.selectedFolder) ?
        this.$store.state.nav.selectedFolder - 1
        : this.$store.state.nav.selectedFolder
      }
    },
    directory: {
      get: function () {
        if (this.selected === null) {
          return this.$store.state.folders.documents
        } else {
          return this.$store.state.folders.folders[this.selected]
        }
      },
      set: function (newValue) {
        this.$store.state.folders.commit('resetDocuments')
        this.$store.state.folders.commit('filesFromDirectory', newValue)
      }
    },
    documents: {
      get: function () {
         if (this.selected !== null && this.directory) {
           // return this.$store.state.documents.documents
          return this.$store.state.folders.documents.filter( doc => doc.dir_id === this.directory.id)
        } else {
          return this.$store.state.folders.documents
          // return this.$store.state.documents.documents.filter( doc => doc.dir_id === this.directory.id)
        }
      }
    }
  },
  mounted () {
    // console.log('mounted this.$route.params', this.$route.params)
  },
  created () {
    // console.log('created this.$route.params', this.$route.params)
  },
  updated () {
    // console.log('updated this.$route.params', this.$route.params)
    // console.log('updated this.$store.state.nav.selectedFolder', this.$store.state.folders.folders[this.$store.state.nav.selectedFolder].name)
  },

  methods: {
  }
}
</script>