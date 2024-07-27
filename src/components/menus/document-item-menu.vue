<template>
  <v-menu
    v-if="!document.archived"
    close-on-content-click
    offset-y
    top
    left
    class="document-menu"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        class="ml-4 mt-2"
        v-on="on"
      >
        <v-icon small>
          icon-more
        </v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item-group>
        <v-list-item
          v-for="(o, index) in options"
          :key="index"
          :disabled="o.disabled"
        >
          <template v-if="o.icon === 'divider'">
            <v-divider></v-divider>
          </template>

          <template v-else>
            <v-list-item-icon>
              <v-icon v-text="o.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content
              id="theme-activator"
              :key="index"
              @click="o.text.endsWith('rename') ? openRenameDocumentDialog()
                : o.text.endsWith('move') ? openMoveDocumentDialog()
                  : o.text.endsWith('duplicate') ? duplicateFile()
                    : o.text.endsWith('archive') ? archiveFile(true)
                      : o.text.endsWith('delete') ? deleteFile() 
                        : null"
              v-text="$t(o.text)"
            ></v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
  <v-btn
    v-else
    rounded
    elevation="0"
    class="mt-5 text-none"
    @click="archiveFile(false)"
    v-text="$t('document.unarchive')"
  ></v-btn>
</template>

<script lang="js">
import { mapActions } from 'vuex'
export default {
  name: 'DocumentItemMenu',
  props: {
		document: Object
	},
  data () {
		return {

			options: [
				{
					icon: 'icon-rename',
					text: 'document.menu.rename',
					disabled: false,
          href: ''
        },
        {
					icon: 'icon-downloads-folder',
					text: 'document.menu.move',
					disabled: false,
          href: ''
        },
        {
					icon: 'icon-duplicate',
					text: 'document.menu.duplicate',
					disabled: false,
          href: ''
        },
        {
					icon: 'icon-box',
					text: 'document.menu.archive',
					disabled: false,
          href: ''
        },
        {
					icon: 'divider',
					text: '',
					disabled: true,
          href: ''
        },
        {
					icon: 'icon-trash',
					text: 'document.menu.delete',
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
    workspace: {
      get: function () {
        return this.$store.state.folders.workspaces[0].id
      }
    },
    currentdirectory: {
      get: function () {
        if(this.$store.state.nav.selectedFolder) {
          return this.$store.state.folders.folders[this.$store.state.nav.selectedFolder - 1]
        } else {
          return ''
        }
      }
    }

	},
	mounted () {},
  methods: {
  ...mapActions('folders', ['duplicateDocument', 'archiveDocument', 'deleteDocument']),
  
    openRenameDocumentDialog () {
      this.$store.commit('setCurrentItem', this.document)
			this.$store.commit('openRenameDocumentDialog', true)
    },
    openMoveDocumentDialog () {
      this.$store.commit('setCurrentItem', this.document)
			this.$store.commit('openMoveDocumentDialog', true)
    },
    async duplicateFile() {
      const {user, workspace, document} = this
      const duplicated = await this.duplicateDocument({ user, workspace, document})
			// TODO duplicateFile snackbar
			this.$store.commit('setCurrentItem', duplicated)
    },
    async archiveFile(toBeArchived) {
      const { user, workspace, document } = this
      const archived = toBeArchived
      const archivedFile = await this.archiveDocument({ user, workspace, document, archived })
      // TODO archiveFile snackbar
      this.$store.commit('setCurrentItem', archivedFile)
    },
		async deleteFile () {
      const { user, workspace, document} = this
      await this.deleteDocument({user, workspace, document })
		}
  },	
}

</script>

<style scoped lang="scss">
.document-menu {
}
</style>
