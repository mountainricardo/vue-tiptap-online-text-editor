import Vue from 'vue'
import Vuex from 'vuex'
import {
  account
} from './account.module'
import {
  folders
} from './folders.module'
import {
  templates
} from './templates.module'
import {
  editor
} from './editor.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    item: {
      current: null
    },
    nav: {
      drawer: null,
      selectedDocument: null,
      selectedFolder: null,
    },
    dialogs: {
      accountSettingsDialog: false,
      newFolderDialog: false,
      renameFolderDialog: false,
      newDocumentDialog: false,
      documentFromTemplateDialog: false,
      moveDocumentDialog: false,
      renameDocumentDialog: false,
      renameTemplateDialog: false,
      renameVersionDialog: false
    },
    theme: {
      dark: false
    }
  },
  getters: {},
  mutations: {
    changeDrawer (state, isOpen) {
      state.nav.drawer = isOpen
    },
    openAccountSettingsDialog (state, isOpen) {
      state.dialogs.accountSettingsDialog = isOpen
    },
    openNewFolderDialog (state, isOpen) {
      state.dialogs.newFolderDialog = isOpen
    },
    openNewDocumentDialog (state, isOpen) {
      state.dialogs.newDocumentDialog = isOpen
    },
    documentFromTemplateDialog (state, isOpen) {
      state.dialogs.documentFromTemplateDialog = isOpen
    },
    openRenameFolderDialog (state, isOpen) {
      state.dialogs.renameFolderDialog = isOpen
    },
    openRenameDocumentDialog (state, isOpen) {
			state.dialogs.renameDocumentDialog = isOpen
    },
    openMoveDocumentDialog (state, isOpen) {
      state.dialogs.moveDocumentDialog = isOpen
    },
    openRenameTemplateDialog (state, isOpen) {
      state.dialogs.renameTemplateDialog = isOpen
    },
    openRenameVersionDialog (state, isOpen) {
      state.dialogs.renameVersionDialog = isOpen
    },
    changeTheme (state, isDark) {
      state.theme.dark = isDark
    },
    selectDocuments (state, document) {
      state.nav.selectedFolder = null
      state.nav.selectedDocument = document
    },
    selectFolders (state, folder) {
      state.nav.selectedDocument = null
      state.nav.selectedFolder = folder
    },
    setCurrentItem (state, item) {
      state.item.current = item
    },
  },
  actions: {
  },
  modules: {
    account,
    folders,
    templates,
    editor
  }
})
