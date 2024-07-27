import {
  foldersService,
  documentsService,
  workspacesService,
  editorService
} from '../services'

const state = {
	folders: [],
	allFolders: [],
	workspaces: [],
	documents: [],
	archivedDocuments: [],

}

const actions = {
	async getAllFolders ({ commit }, { user }) {
		try {
			// keep workspace functionality from original first model design
			// just in case it were to be implemented in the future
			const workspaces = await workspacesService.getAll(user)
			commit('setWorkspaces', workspaces)

			const directories = await foldersService.getAll(user, workspaces[ 0 ].id)
			// Set user created folders, all selectable from dasboard browsing options
			commit('setFolders', directories.filter(f => f.name !== "Documents"))
			// Set all selectable directories for creating or moving documents
			commit('setAllFolders', [directories.filter(f => f.name === "Documents")[0], ...directories.filter(f => f.name !== "Documents")])
			commit('resetDocuments')
			const documents = await documentsService.getAllFilesFromUser(user)
			// Set all active documents from user (all directories)
			commit('documentsFromUser', documents.files)
			const archivedDocuments = await documentsService.getAllArchivedFilesFromUser(user)
			// Set all archived documents from user (all directories)
			commit('archivedDocumentsFromUser', archivedDocuments.files)

		} catch (error) {
			console.log('getAllFolders error', error)
		}
	},
	async getAllFilesFromUser ({ commit }, { user }) {
		try {
			commit('documentsFromUser', [])
			const data = await documentsService.getAllFilesFromUser(user)
			console.log('documentsService.getAllFilesFromUser()', data.files)
			commit('documentsFromUser', data.files)

		} catch (error) {
			console.log('all docs from user error', error)
		}
	},
	async getFileFromUser ({ commit }, { user, fileId }) {
		try {
			const documents = await documentsService.getFileFromUser(user, fileId)
			commit('documentFromUser', documents)

		} catch (error) {
			console.log('all docs from user error', error)
		}
	},
	async createFolder ({ commit }, { user, workspace, foldername }) {
		try {
			const dictionary = await foldersService.newFolder(user, workspace, foldername)
			commit('createFolder', dictionary)
			return dictionary
		} catch (error){
			console.log('createFolder error', error)
		}
	},
	async renameFolder ({ commit }, { user, workspace, directory, foldername }) {
		try {
			const folder = await foldersService.renameFolder(user, workspace, directory, foldername)
			const name = foldername
			commit('renameFolder', { folder, name})
			return folder
		} catch (error){
			console.log('renameFolder error', error)
		}
	},
	async deleteFolder ({ commit }, { user, workspace, directory }) {
		try {
			const code = await foldersService.deleteFolder(user, workspace, directory)
			if(code === 'success') {
				commit('deleteFolder', directory)
				// router.push('/')
				return true
			} else {
				return false
			}
		} catch (error){
			console.log('deleteFolder error', error)
		}
	},
	async createDocument ({ commit }, { user, workspace, directory, documentname }) {
		try {
			const file = await foldersService.createDocument(user, workspace, directory, documentname)
			commit('createDocument', file)
			return file
		} catch (error){
			console.log('createDocument error', error)
		}
	},
	async duplicateDocument({ commit }, { user, workspace, document }) {
		console.log('folders.module.duplicateDocument user %o, workspace %o, document %o, ', user, workspace, document)
		try {
			// const name = `${template.name + this.$t('template.duplicated')}`
			const name = document.name + ' duplicated'
			const duplicated = await foldersService.createDocument(user, workspace, document.dir_id, name)
			const content = await editorService.getFileContent(user, workspace, document)
			const isDuplicated = await editorService.updateFileContent(user, workspace, duplicated, content)
			if (isDuplicated) {
				commit('addDocument', duplicated)
				return duplicated
			}
		} catch (error) {
			console.log('templates.module.duplicateTemplate error', error)
		}
	},
	async renameDocument ({ commit }, { user, workspace, document, documentname }) {
		// console.log('foldersmodule renameDocument user: %o workspace: %o  document: %o documentname %o',user, workspace, document, documentname)
		try {
			const _document = await foldersService.renameDocument(user, workspace, document, documentname)
			commit('renameDocument', _document)
			return _document
		} catch (error){
			console.log('renameDocument error', error)
		}
	},
	async moveDocument ({ commit }, { user, workspace, document, directory }) {
		// console.log('foldersmodule renameDocument user: %o workspace: %o  document: %o documentname %o',user, workspace, document, documentname)
		try {
			const _document = await foldersService.moveDocument(user, workspace, document, directory)
			commit('moveDocument', _document.file)
			return _document.file
		} catch (error){
			console.log('renameDocument error', error)
		}
	},
	async archiveDocument ({ commit }, { user, workspace, document, archived}) {
		// console.log('folders.module.archiveDocument user %o, workspace %o, document %o, archived %o', user, workspace, document, archived)
		try {
			const _document = await foldersService.archiveDocument(user, workspace, document, archived)
			commit('archiveDocument', _document.file)
			return _document.file
		} catch (error) {
			console.log('folders.module.archiveDocument error', error)
		}
	},
	async deleteDocument ({ commit }, { user, workspace, document }) {
		try {
			const code = await foldersService.deleteDocument(user, workspace, document)
			if(code === 'success') {
				commit('deleteDocument', document)
				return document
			}
		} catch (error){
			console.log('deleteDocument error', error)
		}
	}
}

const mutations = {
	setWorkspaces (state, workspaces) {
		state.workspaces = workspaces
	},
	setFolders (state, folders) {
		state.folders = folders
	},
	setAllFolders (state, folder) {
		state.allFolders = folder
	},
	createFolder (state, folder) {
		state.folders.push(folder)
	},
	renameFolder (state, {folder, name}) {
		const index = state.folders.findIndex(f => f.id === folder)
		state.folders[index].name = name
	},
	deleteFolder (state, folder) {
		state.folders.splice(state.folders.findIndex(f => f.id === folder), 1)
	},
	createDocument (state, document) {
		state.documents.push(document)
	},
	addDocument (state, document) {
		if (state.documents.findIndex(d => d.id === document.id) < 0) {
			state.documents.push(document)
		}
	},
	renameDocument (state, document) {
		let documentIndex = state.documents.findIndex(d => d.id === document.id)
		state.documents[documentIndex].name = document.name
	},
	moveDocument (state, document) {
		let documentIndex = state.documents.findIndex(d => d.id === document.id)
		state.documents[documentIndex].dir_id = document.dir_id
	},
	archiveDocument (state, document) {
		if (document.archived){
			let documentIndex = state.documents.findIndex(d => d.id === document.id)
			state.archivedDocuments.push(document)
			state.documents.splice(documentIndex, 1)
		} else {
			let documentIndex = state.archivedDocuments.findIndex(d => d.id === document.id)
			state.documents.push(document)
			state.archivedDocuments.splice(documentIndex, 1)
		}
		// state.documents[documentIndex].archived = document.archived
	},
	deleteDocument (state, document) {
		let documentIndex = state.documents.findIndex(d => d.id === document.id)
		state.documents.splice(documentIndex, 1)
	},
	resetDocuments (state) {
		state.documents = []
	},
	documentsFromUser (state, documents) {
		state.documents = documents
	},
	archivedDocumentsFromUser (state, documents) {
		state.archivedDocuments = documents
	},
	documentFromUser (state, {document}) {
		if (state.documents.indexOf(document) >= 0) {
			state.documents.push(document)
		}
	},
	directoryForFile (state, {file, directory}) {
		state.documents.find(f => f.id === file.id).dir_id = directory
	}

}
export const folders = {
	namespaced: true,
	state,
	actions,
	mutations
}
