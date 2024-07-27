<template>
  <v-dialog
    id="new-document-dialog"
    v-model="dialog"
    max-width="500px"
    content-class="new-folder"
    value="dialog"
    persistent
  >
    <v-card>
      <v-card-title>
        <h3 class="headline">
          {{ $t('dialog.document.move', { doc: documentName }) }}
        </h3>
        <p
          class="caption text--secondary"
          v-html="$t('dialog.document.move-desc')"
        ></p>
      </v-card-title>
      <v-card-text class="d-flex">
        <v-row>
          <v-col cols="12">
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
              @click="moveFile()"
            >
              {{ $t('dialog.move') }}
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
  name: 'DialogDocumentMove',
  components: {
    USelect
  },
  props: {
    dialog: Boolean
  },
  data () {
    return {
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
		document: {
			get: function () {
				return this.$store.state.item.current
			}
		},
		documentName: {
			get: function () {
				if(this.document !== null) {
					return this.document.name
				} else {
					return ''
				}
			}
		},
    directories: {
      get: function () {
        // const allFolders = [this.$store.state.folders.documentsFolder, ...this.$store.state.folders.folders]
        return this.$store.state.folders.allFolders
        // return this.$store.state.folders.folders
      }
    },
    form () {
      return {
				selectedDirectory: this.selectedDirectory,
      }
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions("folders", ["moveDocument"]),
    closeDialog () {
      this.$store.commit('openMoveDocumentDialog', !this.dialog)
    },
    moveFile: async function () {
      const { user, workspace, form: {
				selectedDirectory: directory
				}, document} = this
      const _document = await this.moveDocument({user, workspace, document, directory })
      // TODO moveDocument snackbar
      this.$store.commit('setCurrentItem', _document)      
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
