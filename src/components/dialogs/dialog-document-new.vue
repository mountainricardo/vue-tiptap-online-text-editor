<template>
  <v-dialog
    id="new-document-dialog"
    v-model="dialog"
    max-width="400px"
    content-class="new-folder"
    value="dialog"
    persistent
  >
    <v-card>
      <v-card-title>
        <p class="h6">
          {{ $t('dialog.document.create') }}
        </p>
        <p
          class="body-1 text--secondary"
          v-html="$t('dialog.document.create-desc')"
        ></p>
      </v-card-title>
      <v-card-text class="d-flex">
        <v-row>
          <v-col cols="12">
            <v-text-field
              ref="documentname"
              v-model="documentname"
              autofocus
              :label="$t('dialog.document.name')"
              persistent-hint
              flat
              :background-color="`${(!dark)? 'white': null}`"
              :color="`${(!dark)? 'gray': null}`"
              class="mr-3"
              outlined
              rounded
              clearable
              clear-icon="icon-delete"
            ></v-text-field>
            <v-spacer></v-spacer>
            <u-select
              :ref="'selectedDirectory'"
              :items="directories"
              :label="$t('dialog.document.choose-directory')"
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
            order="last"
          >
            <v-btn
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
          <v-col
            cols="12"
            md="6"
            order="first"
          >
            <v-btn
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
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import USelect from '@/components/elements/u-select.vue'

export default {
  name: 'DialogDocumentNew',
  components: {
    USelect
  },
  props: {
    dialog: Boolean
  },
  data () {
    return {
			documentname: null,
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
    form () {
      return {
				selectedDirectory: this.selectedDirectory,
				documentname: (this.documentname) ? this.documentname : 'Untitled'
      }
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions("folders", ["createDocument"]),
    closeDialog () {
      this.$store.commit('openNewDocumentDialog', !this.dialog)
    },
    createNewDocument: async function () {
      const { user, workspace, form: {
				selectedDirectory: directory,
				documentname: documentname
				}} = this
      const document = await this.createDocument({user, workspace, directory, documentname })
      // TODO renameDocument snackbar
      this.$store.commit('setCurrentItem', document)
      this.$emit('document', document)
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
