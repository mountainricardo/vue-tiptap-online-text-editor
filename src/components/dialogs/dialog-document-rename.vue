<template>
  <v-dialog
    id="rename-document-dialog"
    v-model="dialog"
    max-width="400px"
    content-class="new-folder"
    value="dialog"
    persistent
  >
    <v-card>
      <v-card-title>
        <p class="h6">
          {{ $t('dialog.document.rename') }}
        </p>
        <p
          class="body-1 text--secondary"
          v-html="$t('dialog.document.rename-desc')"
        ></p>
      </v-card-title>
      <v-card-text class="d-flex">
        <v-row>
          <v-col cols="12">
            <v-text-field
              ref="documentname"
              v-model="documentname"
              tabindex="1"
              autofocus
              :label="$t('dialog.document.name')"
              persistent-hint
              flat
              :background-color="`${(!dark)? 'white': null}`"
              :color="`${(!dark)? 'gray': null}`"
              outlined
              rounded
              clearable
              clear-icon="icon-delete"
            ></v-text-field>
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
              @click="renameFile()"
            >
              {{ $t('dialog.done') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'DialogDocumentRename',
  props: {
		dialog: Boolean,
  },
  data () {
    return {
      documentname: null
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
		document: {
			get: function () {
				return this.$store.state.item.current
			}
		},
    currentdirectory: {
      get: function () {
        if(this.$store.state.item.current) {
					return this.$store.state.folders.folders
						.find(folder => folder.id === this.$store.state.item.current.dir_id)
        } else {
          return ''
        }
      }
    },
    form () {
      return {
        documentname: this.documentname
      }
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions("folders", ["renameDocument"]),
    closeDialog () {
      this.$store.commit('openRenameDocumentDialog', !this.dialog)
    },
    async renameFile () {
			// const { user, workspace, currentdirectory: {id: directory}, document, form: {documentname: documentname}} = this
			const { user, workspace, document, form: {documentname: documentname}} = this
			// console.log('rename doc dialog renamefile user: %o workspace: %o directory: %o document: %o documentname %o',user, workspace, directory, document, documentname)
      // const renamed = await this.renameDocument({user, workspace, directory, document, documentname })
      const renamed = await this.renameDocument({user, workspace, document, documentname })
      // TODO renameDocument snackbar
      this.$store.commit('setCurrentItem', renamed)
      this.closeDialog()
    }
  }
}

</script>

<style scoped lang="scss">
  .new-folder {
    fieldset{
      &.v-text-field--outlined{
        border-color: grey lighten-3!important;
      }
    }
  }
</style>
