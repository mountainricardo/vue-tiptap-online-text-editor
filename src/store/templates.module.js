import { templatesService, editorService } from '../services'
// import router from '../router/index.js'

const state = {
	templates: []
}

const actions = {
	async getAllTemplates ({ commit }, { user }) {
		try {
			const templates = await templatesService.getAllTemplates(user)
			// console.log('templatesService.getAllTemplates', templates)
			commit('allTemplates', templates)

		} catch (error) {
			console.log('templatesService.getAllTemplates error', error)
		}
	},
	async getTemplate ({ commit }, { user, templateId }) {
		try {
			const template = await templatesService.getTemplate(user, templateId)
			// console.log('templatesService.getTemplate', templates)
			commit('addTemplate', template)

		} catch (error) {
			console.log('templatesService.getTemplate error', error)
		}
	},
	async newTemplate({ commit }, { user, name }) {
		// console.log('templates.module.newTemplate user: %O, name: %O', user, name)
		try {
			const template = await templatesService.newTemplate(user, name)
			// console.log('templatesService.newTemplate', template)
			commit('addTemplate', template)
			return template

		} catch (error) {
			console.log('templatesService.newTemplate error', error)
		}
	},
	async duplicateTemplate({ commit }, { user, template }) {
		// console.log('templates.module.duplicateTemplate user %o, template %o', user, template)
		try {
			// const name = `${template.name + this.$t('template.duplicated')}`
			const name = template.name + ' duplicated'
			const duplicated = await templatesService.newTemplate(user, name)
			const content = await editorService.getTemplateContent(user, template)
			const isDuplicated = await editorService.updateTemplateContent(user, duplicated, content)
			if (isDuplicated) {
				commit('addTemplate', duplicated)
				return duplicated
			}
		} catch (error) {
			console.log('templates.module.duplicateTemplate error', error)
		}
	},
	async renameTemplate ({ commit }, { user, template, newname }) {
		// console.log('templates.module.renameTemplate user, template, newname', user, template, newname)
		try {
			const temp = await templatesService.renameTemplate(user, template, newname)
			// console.log('templates.module.renameTemplate got template', template)
			const name = temp.name
			commit('renameTemplate', { template, name})
			return template
		} catch (error){
			console.log('renameTemplate error', error)
		}
	},
	async deleteTemplate ({ commit }, { user, template }) {
		// console.log('templates.module.deleteTemplate user %o, template %o', user, template)
		try {
			const code = await templatesService.deleteTemplate(user, template)
			if(code === 'success') {
				commit('deleteTemplate', template)
				if (template) {
					return template
				}
				// router.push('/templates')
			}
		} catch (error){
			console.log('deleteFolder error', error)
		}
	}
}

const mutations = {
	allTemplates (state, templates) {
		state.templates = templates
	},
	// template (state, {template}) {
	// 	if (state.templates.indexOf(template) < 0) {
	// 		state.templates.push(template)
	// 	}
	// },
	addTemplate (state, template) {
		if (state.templates.findIndex(t => t.id === template.id) < 0) {
			state.templates.push(template)
		}
	},
	renameTemplate (state, {template, name}) {
		const index = state.templates.findIndex(t => t.id === template.id)
		state.templates[index].name = name
	},
	deleteTemplate (state, template) {
		state.templates.splice(state.templates.findIndex(t => t.id === template.id), 1)
	},	
}
export const templates = {
	namespaced: true,
	state,
	actions,
	mutations
}
