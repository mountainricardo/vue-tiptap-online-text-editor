<template>
  <v-dialog
    id="new-folder-dialog"
    v-model="dialog"
    max-width="400px"
    content-class="new-folder"
    value="dialog"
    persistent
  >
    <v-card>
      <v-card-title>
        <h3 class="headline">
          {{ $t('dialog.folder.new') }}
        </h3>
        <p
          class="caption text--secondary"
          v-text="$t('dialog.folder.new-desc')"
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
              outlined
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
              @click="createNewFolder()"
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

export default {
  name: 'DialogFolderNew',
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
    form () {
      return {
        foldername: this.foldername
      }
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions("folders", ["createFolder"]),
    closeDialog () {
      this.$store.commit('openNewFolderDialog', !this.dialog)
    },
    createNewFolder: function () {
      const { user, workspace, form: {foldername: foldername}} = this
      this.createFolder({user, workspace, foldername })
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
