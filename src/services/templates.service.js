import axios from 'axios'
import {
	authHeader
} from '../services/'
import { api } from '@/config'

export const templatesService = {
	getAllTemplates,
	getTemplate,
	newTemplate,
	renameTemplate,
	deleteTemplate,
}

async function getAllTemplates (user) {
	const requestOptions = {
		method: 'get',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.template.templates }`,
		headers: authHeader()
	}

	try {
		const response = await axios.request(requestOptions)
		// console.log('templatesService.getAllTemplates response', response)
		return response.data.templates

	} catch (error) {
		console.log('getAllTemplates', error)
	}
}

async function getTemplate (user, templateId) {
	const requestOptions = {
		method: 'get',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.template.templates
			+ '/'
			+ templateId }`,
		headers: authHeader()
	}

	try {
		const response = await axios.request(requestOptions)
		// console.log('templatesService.getTemplate response', response)
		return response.data.template

	} catch (error) {
		console.log('getTemplate error', error)
	}
}

async function newTemplate (user, name) {
	// console.log('templatesService.newTemplate( user: %O, name: %O)', user, name)
	const requestOptions = {
		method: 'post',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.template.templates
		}`,
		data: {
			name: name
		},
		headers: authHeader()
	}

	try {
		const response = await axios.request(requestOptions)
		// console.log('templatesService.getTemplate response', response)
		return response.data.template

	} catch (error) {
		console.log('newTemplate error', error)
	}

}

async function renameTemplate (user, template, newname) {
	// console.log('templatesService.renameTemplate user, template, newname', user, template, newname)
	const requestOptions = {
		method: 'put',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.template.templates
			+ '/'
			+ template.id
		}`,
		data: {
			name: newname
		},
		headers: authHeader()
	}
	try {
		const response = await axios.request(requestOptions)
		// console.log('templatesService.renameTemplate response', response)
		return response.data.template

	} catch (error) {
		console.log('templatesService.renameTemplate',error)
	}
}

async function deleteTemplate (user, template) {
	const requestOptions = {
		method: 'delete',
		url: `${ api.apiUrl
			+ api.user.users
			+ user.id
			+ api.template.templates
			+ '/'
			+ template.id
		}`,
		headers: authHeader()
	}
	try {
		const response = await axios.request(requestOptions)
		return response.data.code

	} catch (error) {
		console.log('templatesService.deleteTemplate', error)
	}
}



