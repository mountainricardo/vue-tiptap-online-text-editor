import axios from 'axios'
import {
  authHeader
} from '../services/'
import { api } from '@/config'

export const editorService = {
  getFileContent,
  updateFileContent,
  getTemplateContent,
  updateTemplateContent
}

async function getFileContent (user, workspace, document) {
  // console.log('editorService.getFileContent({user: %O, workspace: %O, document: %O})', user, workspace, document)
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
      + document.dir_id 
      + api.file.files
      + '/'
      + document.id
      + api.file.content
    }`,
    headers: authHeader()
  }

  try {
    const response = await axios.request(requestOptions)
    return response.data
  } catch (error) {
    console.log('editorService.getFileContent error', error)
  }
}

async function updateFileContent (user, workspace, document, content) {
  // console.log('editorService.updateFileContent user: %O, workspace: %O, document: %O, content: %O', user, workspace, document, content)
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
      + api.file.content
    }`,
    data: content,
    headers: authHeader()
  }
  try {
    const response = await axios.request(requestOptions)
    return (response.data.code === 'success') ? true : false
  } catch (error) {
    console.log('editorService.updateFileContent error', error)
  }
}

async function getTemplateContent (user, template) {
  const requestOptions = {
    method: 'get',
    url: `${ api.apiUrl
      + api.user.users
      + user.id
      + api.template.templates
      + '/'
      + template.id
      + api.template.content
    }`,
    headers: authHeader()
  }

  try {
    const response = await axios.request(requestOptions)
    // console.log('editorService.getTemplateContent raw response', response)
    return response.data

  } catch (error) {
    console.log('editorService.getTemplateContent error', error)
  }
}

async function updateTemplateContent (user, template, content) {
  // console.log('editorService.updateTemplateContent(user: %o, template: %o, content: %o', user, template, content)
  const requestOptions = {
    method: 'put',
    url: `${ api.apiUrl
      + api.user.users
      + user.id
      + api.template.templates
      + '/'
      + template.id
      + api.template.content
    }`,
    data: content,
    headers: authHeader()
  }
  try {
    const response = await axios.request(requestOptions)
    // console.log('editorService.updateTemplateContent response', response)
    return (response.data.code === 'success') ? true : false
  } catch (error) {
    console.log('editorService.updateTemplateContent error', error)
  }
}