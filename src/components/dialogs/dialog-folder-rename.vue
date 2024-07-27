<template>
  <v-dialog
    id="rename-folder-dialog"
    v-model="dialog"
    max-width="400px"
    content-class="new-folder"
    value="dialog"
    persistent
  >
    <v-card>
      <v-card-title>
        <p class="h6">
          {{ $t('dialog.folder.rename') }}
        </p>
        <p
          class="body-1 text--secondary"
          v-html="$t('dialog.folder.rename-desc')"
        ></p>
      </v-card-title>
      <v-card-text class="d-flex">
        <v-row>
          <v-col cols="12">
            <v-text-field
              ref="foldername"
              v-model="foldername"
              tabindex="1"
              :label="$t('dialog.folder.name')"
              persistent-hint
              solo
              flat
              background-color="grey lighten-3"
              filled
              shaped
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
              @click="renameDirectory()"
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
  name: 'DialogFolderRename',
  props: {
    dialog: Boolean
  },
  data () {
    return {
      foldername: null
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
          return this.$store.state.folders.folders[this.$store.state.nav.selectedFolder - 1].id
        } else {
          return ''
        }
      }
    },
    form () {
      return {
        foldername: this.foldername
      }
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions("folders", ["renameFolder"]),
    closeDialog () {
      this.$store.commit('openRenameFolderDialog', !this.dialog)
    },
    renameDirectory () {
			const { user, workspace, currentdirectory: directory, form: {foldername: foldername}} = this
      this.renameFolder({user, workspace, directory, foldername })
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
