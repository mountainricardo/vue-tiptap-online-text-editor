<template>
  <v-menu
    offset-x
    right
    bottom
    class="editor-doc-menu"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-card
        elevation="0"
        v-bind="attrs"
        class="ml-2 py-1 d-flex flex-no-wrap justify-space-between align-baseline"
        v-on="on"
      >
        <v-card-title class="d-flex py-0">
          <div class="d-flex flex-column">
            <span class="menu-heading h6 text-left">
              {{ file.name }}
            </span>
            <span class="menu-subheading subtitle-2 text-left">
              {{ directoryName }}
            </span>
          </div>
        </v-card-title>
        <v-icon
          class="mx-2"
          small
          v-text="'icon-expand-arrow'"
        ></v-icon>
      </v-card>
    </template>
    <v-list dense>
      <v-list-item-group
        v-if="$store.state.editor.document !== null"
      >
        <v-list-item
          v-for="(u, index) in docMenu"
          :key="index"
          :disabled="u.disabled"
        >
          <v-list-item-icon>
            <v-icon v-text="u.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content
            :key="index"
            @click="u.text.endsWith('template') ? saveFileAsTemplate() : openRenameDocumentDialog()"
            v-text="$t(u.text)"
          ></v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="js">
import { mapActions } from 'vuex'
export default {
  name: 'EditorFileMenu',
  props: [],
  data () {
    return {
      docMenu: [
        {
          icon: 'icon-versions',
          text: 'editor.file-menu.save-as-template',
          disabled: false,
          href: ''
        },
        {
          icon: 'icon-rename',
          text: 'editor.file-menu.rename-document',
          disabled: false,
          href: ''
        }
      ]
    }
  },
  computed: {
    user: {
      get: function () {
        return this.$store.state.account.user
      }
    },
    directoryName: {
      get: function () {
        if (this.$store.state.editor.document !== null) {
          return this.$store.state.folders.allFolders.find(
            f => f.id === this.$store.state.editor.document.dir_id)
            .name
        } 
				else {
          return ''
        }
      }
    },
    file: {
      get: function () {
        return this.$store.state.editor.document
      }
    },
    workspace: {
      get: function () {
        return this.$store.state.folders.workspaces[0].id
      }
    },
    currentItem: {
      get: function () {
        return this.$store.state.item.current
      }
    }

  },
  mounted () {
  },
  methods: {
    ...mapActions('templates', ['newTemplate']),
    ...mapActions('editor', ['getDocumentContent', 'updateTemplateContent']),
    openRenameDocumentDialog () {
      this.$store.commit('setCurrentItem', this.$store.state.editor.document)
			this.$store.commit('openRenameDocumentDialog', true)
		},

    async saveFileAsTemplate() {
      // create new template named document.name
      const { user, file: {name: name}} = this
      const template = await this.newTemplate ({ user, name })
      // get document content
      const {workspace, file: {directory: directory}, file: document} = this
      const content = await this.getDocumentContent({user, workspace, directory, document})
      // update template content
      this.updateTemplateContent({ user, template, content })
      this.$emit('alert', this.$t('alert.saved-as-template', { doc: document.name}))
    }
  }
}

</script>

<style lang="scss">
.editor-doc-menu {
}
</style>
