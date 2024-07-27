<template>
  <v-dialog
    id="document-from-template--dialog"
    v-model="dialog"
    max-width="400px"
    content-class="new-folder"
    value="dialog"
    persistent
  >
    <v-card>
      <v-card-title>
        <p class="h6">
          {{ $t('dialog.document-from-template.create') }}
        </p>
        <p
          class="body-1 text--secondary word-no-break"
          v-html="$t('dialog.document-from-template.create-desc')"
        ></p>
      </v-card-title>
      <v-card-text class="d-flex">
        <v-row>
          <v-col cols="12">
            <u-select
              :ref="'selectedDirectory'"
              :items="directories"
              :label="$t('dialog.document-from-template.choose-directory')"
              :hide="false"
              :class="'mb-3 mr-3'"
              :item-text="'name'"
              :item-value="'id'"
              @select="selected"
            ></u-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex">
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-btn
              tabindex="3"
              rounded
              large
              block
              class="text-none"
              elevation="0"
              @click="closeDialog()"
            >
              {{ $t('dialog.cancel') }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-btn
              tabindex="2"
              color="primary"
              rounded
              large
              block
              class="text-none"
              elevation="0"
              @click="createNewDocument()"
            >
              {{ $t('dialog.create') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import USelect from '@/components/elements/u-select.vue'

export default {
  name: 'DialogDocumentFromTemplate',
  components: {
    USelect
  },
  props: {
    dialog: Boolean
  },
  data () {
    return {
			// documentname: this.template.name,
			selectedDirectory: null
    }
  },
  computed: {
    dark: {
      get: function () {
        return this.$store.state.theme.dark
      }
    },
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
    directories: {
      get: function () {
        return this.$store.state.folders.allFolders
      }
		},
    template: {
      get: function () {
        return this.$store.state.editor.template
      }
    },
		
    form () {
      return {
				selectedDirectory: this.selectedDirectory,
				documentname: (this.template) ? this.template.name : 'Untitled'
      }
    }
  },
  mounted () {

  },
  methods: {
		...mapActions("folders", ["createDocument"]),
    ...mapActions('editor', [
      'updateDocumentContent',
      'getTemplateContent',
      ]),
		
    closeDialog () {
      this.$store.commit('documentFromTemplateDialog', !this.dialog)
    },
    createNewDocument: async function () {
      const { user, workspace, template, form: {
				selectedDirectory: directory,
				documentname: documentname
				}} = this
      const document = await this.createDocument({user, workspace, directory, documentname })
      // TODO renameDocument snackbar
			this.$store.commit('setCurrentItem', document)
        const content = await this.getTemplateContent({user, template})
        // update new document content
        this.updateDocumentContent({ user, workspace, document, content })
        this.$emit('alert', this.$t('alert.saved-as-document', { template: template.name, doc: document.name}))
			
      this.closeDialog()
		},
		selected: function (value) {
      this.selectedDirectory = value
		}
  }
}

</script>

<style scoped lang="scss">

</style>
