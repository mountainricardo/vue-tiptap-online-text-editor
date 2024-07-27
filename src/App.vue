<template>
  <v-app id="quickscript">
    <!-- <app-navigation v-if="logged && !editor"></app-navigation> -->
    <app-navigation v-show="logged && !editor"></app-navigation>

    <app-bar v-if="logged && !editor"></app-bar>
    <!-- <app-bar v-show="logged && !editor"></app-bar> -->

    <v-main>
      <v-progress-circular
        v-if="logging "
        class="logging"
        :size="100"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
      <v-container v-else-if="logged && !editor">
        <v-row>
          <v-col
            cols="12"
            class="app-main"
          >
            <dashboard-banner></dashboard-banner>
            <!-- <dashboard-banner v-show="logged && !editor"></dashboard-banner> -->
          </v-col>
          <v-col
            cols="12"
            class="app-main"
          >
            <router-view />
          </v-col>
        </v-row>
      </v-container>
      <router-view v-else />
    </v-main>

    <account-settings-dialog
      :dialog="this.$store.state.dialogs.accountSettingsDialog"
    ></account-settings-dialog>

    <dialog-folder-new
      :dialog="this.$store.state.dialogs.newFolderDialog"
    ></dialog-folder-new>

    <dialog-document-new
      :dialog="this.$store.state.dialogs.newDocumentDialog"
    ></dialog-document-new>

    <dialog-folder-rename
      :dialog="this.$store.state.dialogs.renameFolderDialog"
    ></dialog-folder-rename>

    <dialog-document-rename
      :dialog="this.$store.state.dialogs.renameDocumentDialog"
    ></dialog-document-rename>

    <dialog-document-move
      :dialog="this.$store.state.dialogs.moveDocumentDialog"
    ></dialog-document-move>

    <dialog-template-rename
      :dialog="this.$store.state.dialogs.renameTemplateDialog"
    ></dialog-template-rename>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import AppNavigation from '@/components/app-navigation.vue'
import DashboardBanner from '@/components/DashboardBanner.vue'
import AppBar from '@/components/app-bar.vue'
import AccountSettingsDialog from '@/components/dialogs/account-settings-dialog.vue'
import DialogFolderNew from '@/components/dialogs/dialog-folder-new.vue'
import DialogDocumentNew from '@/components/dialogs/dialog-document-new.vue'
import DialogFolderRename from '@/components/dialogs/dialog-folder-rename.vue'
import DialogDocumentRename from '@/components/dialogs/dialog-document-rename.vue'
import DialogDocumentMove from '@/components/dialogs/dialog-document-move.vue'
import DialogTemplateRename from '@/components/dialogs/dialog-template-rename.vue'

export default {
  name: 'Home',
  components: {
    AppNavigation,
    DashboardBanner,
    AppBar,
    AccountSettingsDialog,
    DialogFolderNew,
    DialogFolderRename,
    DialogDocumentNew,
    DialogDocumentRename,
    DialogDocumentMove,
    DialogTemplateRename
  },
  data () {
    return {

    }
  },
  computed: {
    logging: {
      get: function () {
        return this.$store.state.account.status.logging
      }
    },
    logged: {
      get: function () {
        return this.$store.state.account.status.loggedIn
      }
    },
    editor: {
      get: function () {
        return this.$store.state.editor.editor
      }
    },
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

  },
  created() {
  },
  updated() {
    if (this.logged && !this.workspace){
      const { user } = this
      this.getAllFolders({user})
      this.getAllTemplates({user})
    }
  },
  mounted() {
    this.$store.commit('selectDocuments', 1)
  },
    methods: {
    ...mapActions('folders', ['getAllFolders']),
    ...mapActions('templates', ['getAllTemplates']),
  }
}
</script>

<style lang="scss">
$color-pack: false;

// @import '~vuetify/src/styles/main.sass';

.v-application {
  .side-nav {
    &.v-list-item--active:before {
      background-color: transparent;
      background: none
    }
    &.v-list-item--active {
      color: #5670e9;
    }
    &.router-link-active {
      color: primary;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
  }
  .app-bar {}
  .app-main {
    padding: 0 3rem;
  }
}
.logging{
  position: absolute;
  top: 40%;
  left: 40%;
}
</style>
