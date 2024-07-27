import axios from 'axios'
import {
	authHeader
} from '../services/'
import { api } from '@/config'

export const workspacesService = {
	getAll
}
// keep workspace functionality from original first model design
// just in case it were to be implemented in the future
async function getAll (user) {
	const requestOptions = {
		method: 'get',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.workspace.workspaces }`,
		headers: authHeader()
	}

	try {
		const response = await axios.request(requestOptions)
		return response.data.workspaces

	} catch (error) {
		console.log('get all workspaces error', error)
	}
}