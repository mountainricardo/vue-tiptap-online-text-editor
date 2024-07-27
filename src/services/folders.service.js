import axios from 'axios'
import {
	authHeader
} from '../services/'
import { api } from '@/config'

export const foldersService = {
	getAll,
	newFolder,
	renameFolder,
	deleteFolder,
	getFilesFromFolder,
	createDocument,
	renameDocument,
	moveDocument,
	archiveDocument,
	deleteDocument
}

async function getAll (user, workspace) {
	const requestOptions = {
		method: 'get',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.workspace.workspaces
			+ '/'
			+ workspace
			+ api.directory.directories }`,
		headers: authHeader()
	}
	try {
		const response = await axios.request(requestOptions)
		localStorage.setItem('directories', JSON.stringify(response.data.directories))
		return response.data.directories

	} catch (error) {
		console.log('foldersService.getAll', error)
	}
}

async function newFolder (user, workspace, foldername) {
	const requestOptions = {
		method: 'post',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.workspace.workspaces
			+ '/'
			+ workspace
			+ api.directory.directories }`,
		data: {
			name: foldername
		},
		headers: authHeader()
	}
	try {
		const response = await axios.request(requestOptions)
		return response.data.directory

	} catch (error) {
		console.log('foldersService.newFolder error', error)
	}
}

async function renameFolder (user, workspace, directory, newfoldername) {
	const requestOptions = {
		method: 'put',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.workspace.workspaces
			+ '/'
			+ workspace
			+ api.directory.directories
			+ '/'
			+ directory }`,
		data: {
			name: newfoldername
		},
		headers: authHeader()
	}
	try {
		const response = await axios.request(requestOptions)
		return response.data.directory.id

	} catch (error) {
		console.log('foldersService.renameFolder',error)
	}
}

async function deleteFolder (user, workspace, directory) {
	const requestOptions = {
		method: 'delete',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.workspace.workspaces
			+ '/'
			+ workspace
			+ api.directory.directories
			+ '/'
			+ directory}`,
		headers: authHeader()
	}
	try {
		const response = await axios.request(requestOptions)
		return response.data.code

	} catch (error) {
		console.log('foldersService.deleteFolder', error)
	}
}

async function getFilesFromFolder (user, workspace, directory) {
	const requestOptions = {
		method: 'get',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.workspace.workspaces
			+ '/'
			+ workspace
			+ api.directory.directories
			+ '/'
			+ directory
			+ api.file.files}`,
		headers: authHeader()
	}
	try {
		const response = await axios.request(requestOptions)
		return response.data.files
	} catch (error) {
		console.log('foldersService.getFilesFromFolder error ', error)
	}
}

async function createDocument(user, workspace, directory, documentname) {
	// console.log('foldersService.createDocument user %o, workspace %o, document %o, documentname %o', user, workspace, document, documentname)
	const requestOptions = {
		method: 'post',
		url: `${
			api.apiUrl
			+ api.user.users
			+ user.id
			+ api.workspace.workspaces
			+ '/'
			+ workspace
			+ api.directory.directories
			+ '/'
			+ directory
			+ api.file.files
		}`,
		data: {
			name: documentname
		},
		headers: authHeader()
	}
	try {
		const response = await axios.request(requestOptions)
		return response.data.file

	} catch (error) {
		console.log('foldersService.createDocument error', error)
	}
}

async function renameDocument (user, workspace, document, documentname) {
	// console.log('foldersService.renameDocument user %o, workspace %o, document %o, documentname %o', user, workspace, document, documentname)
	const requestOptions = {
		method: 'put',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.workspace.workspaces
			+ '/'
			+ workspace
			+ api.directory.directories
			+ '/'
			+ document.dir_id 
			+ api.file.files
			+ '/'
			+ document.id
		}`,
		data: {
			name: documentname
		},
		headers: authHeader()
	}
	try {
		const response = await axios.request(requestOptions)
		return response.data.file

	} catch (error) {
		console.log('foldersService.renameDocument',error)
	}
}

async function moveDocument (user, workspace, document, directory) {
	// console.log('foldersService.moveDocument user %o, workspace %o, document %o, directory %o', user, workspace, document, directory)
	const requestOptions = {
		method: 'put',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.workspace.workspaces
			+ '/'
			+ workspace
			+ api.directory.directories
			+ '/'
			+ document.dir_id 
			+ api.file.files
			+ '/'
			+ document.id
		}`,
		data: {
			name: document.name,
			targetDir: directory
		},
		headers: authHeader()
	}
	try {
		const response = await axios.request(requestOptions)
		return response.data

	} catch (error) {
		console.log('foldersService.moveDocument',error)
	}
}

async function archiveDocument (user, workspace, document, archived) {
	// console.log('foldersService.archiveDocument user %o, workspace %o, document %o, archive %o', user, workspace, document, archived)
	const requestOptions = {
		method: 'put',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.workspace.workspaces
			+ '/'
			+ workspace
			+ api.directory.directories
			+ '/'
			+ document.dir_id 
			+ api.file.files
			+ '/'
			+ document.id
		}`,
		data: {
			archived: archived
		},
		headers: authHeader()
	}
	try {
		// console.log('requestOptions', requestOptions)
		const response = await axios.request(requestOptions)
		return response.data

	} catch (error) {
		console.log('foldersService.archiveDocument',error)
	}
}

async function deleteDocument (user, workspace, document) {
	// console.log('foldersService.deleteDocument user %o, workspace %o, document %o', user, workspace, document)
	const requestOptions = {
		method: 'delete',
		url: `${
			api.apiUrl
			+ api.user.users
			+ user.id
			+ api.workspace.workspaces
			+ '/'
			+ workspace
			+ api.directory.directories
			+ '/'
			+ document.dir_id
			+ api.file.files
			+ '/'
			+ document.id
		}`,
		headers: authHeader()
	}
	try {
		const response = await axios.request(requestOptions)
		return response.data.code

	} catch (error) {
		console.log('foldersService.deleteDocument', error)
	}
}