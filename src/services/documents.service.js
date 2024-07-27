import axios from 'axios'
import {
	authHeader
} from '../services/'
import { api } from '@/config'

export const documentsService = {
	getAllFilesFromUser,
	getAllArchivedFilesFromUser,
	setDirectoryForFile,
	getFileFromUser
}

async function getAllFilesFromUser (user) {
	const requestOptions = {
		method: 'get',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.file.files }`,
		headers: authHeader()
	}
	try {
		const response = await axios.request(requestOptions)
		// console.log('documentsService.getAllFilesFromUser response', response)
		return response.data

	} catch (error) {
		console.log('getAllFilesFromUser', error)
	}
}

async function getAllArchivedFilesFromUser (user) {
	const requestOptions = {
		method: 'get',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.file.files
			+ '?'
			+ api.file.archived
			+ true
		}`,

		headers: authHeader()
	}
	try {
		const response = await axios.request(requestOptions)
		// console.log('documentsService.getAllFilesFromUser response', response)
		return response.data

	} catch (error) {
		console.log('getAllFilesFromUser', error)
	}
}

async function getFileFromUser (user, fileId) {
	const requestOptions = {
		method: 'get',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.file.files
			+ '/'
			+ fileId }`,
		headers: authHeader()
	}
	try {
		const response = await axios.request(requestOptions)
		// console.log('get all files from user response', response)
		return response.data.file

	} catch (error) {
		console.log('getFileFromUser error', error)
	}
}

async function setDirectoryForFile ( file, directory) {
	try {
		this.$store.state.documents.commit ('directoryForFile', {file, directory})
	} catch (error) {
		console.log('setDirectoryForFile', error)
	}
}

