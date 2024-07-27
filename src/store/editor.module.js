import { editorService } from '../services'

const state = {
  document: null,
  template: null,
  content: {},
  allContentVersions: [],
  contentVersion: 0,
  editor: false
}

const empty = [
  {
    "versionName": "",
    "content":
    {
    "type": "doc",
      "content": [
{         "type": "doc_section",
       "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "This is a blank section, start by adding text to it."
              }
            ]
          },
          {
            "type": "paragraph",
            "content": [
              {
                "type": "text",
                "marks": [
                  {
                    "type": "link",
                    "attrs": {
                      "href": "#",
                      "target": null
                    }
                  }
                ],
                "text": "Add a textbox"
              }
            ]
          }
        ]}
    ]
    }
  }
  // {
  //   "versionName": "",
  //   "content":
  //   {
  //   "type": "doc",
  //   "content": [
  //     {
  //       "type": "paragraph",
  //       "content": [
  //         {
  //           "type": "text",
  //           "text": "This is a blank section, start by adding text to it."
  //         }
  //       ]
  //     },
  //     {
  //       "type": "paragraph",
  //       "content": [
  //         {
  //           "type": "text",
  //           "marks": [
  //             {
  //               "type": "link",
  //               "attrs": {
  //                 "href": "#",
  //                 "target": null
  //               }
  //             }
  //           ],
  //           "text": "Add a textbox"
  //         }
  //       ]
  //     }
  //   ]
  //   }
  // }
]

const actions = {
  async getDocumentContent ({ commit }, { user, workspace, document }) {
    // console.log('editor.module.getDocumentContent({user: %O, workspace: %O, document: %O})', user, workspace, document)
    try {
      commit('openDocument', document)
      const content = await editorService.getFileContent(user, workspace, document)
      commit('setDocumentContent', content)
      return content
    } catch (error) {
      console.log('editor.module.getDocumentContent error', error)
    }
  },
  async updateDocumentContent ({ commit }, { user, workspace, document, content }) {
    // console.log('editor.module.updateDocumentContent user: %O, workspace: %O, document: %O, content: %O', user, workspace, document, content)
    try {
      const updated = await editorService.updateFileContent(user, workspace, document, content)
      if (updated){
        commit('setDocumentContent', content)
      }
      return updated
    } catch (error) {
      console.log('editor.module.updateDocumentContent error', error)
    }
  },
  async closeDocument ({commit}) {
    commit('closeDocument')
  },
  async getTemplateContent ({commit}, { user, template}) {
    // console.log('editor.module.getTemplateContent({user: %O, document: %O})', user, document)
    try {
      commit('readTemplate', template)
      const content = await editorService.getTemplateContent(user, template)
      commit('setTemplateContent', content)
    } catch (error) {
      console.log('editor.getTemplateContent error', error)
    }
  },
  async updateTemplateContent ({ commit }, { user, template, content }) {
    // console.log('editor.module.updateTemplateContent user: %O, template: %O, content: %O', user, template, content)
    try {
      const updated = await editorService.updateTemplateContent(user, template, content)
      if (updated){
        commit('setTemplateContent', content)
      }
      return updated
    } catch (error) {
      console.log('editor.module.updateTemplateContent error', error)
    }
  },
  async updateContentBuffer ( { commit }, {content, version}) {
    commit('setContentBuffer', {content, version})
  },
  async changeEditorVersion ({ commit }, { version }) {
    commit('changeVersion', version)
  },
  async newVersion ({ commit }) {
    commit('newVersion')
  },
  async renameVersion ({ commit }, { newname }) {
    commit('renameVersion', newname)
  },
  async duplicateVersion ({ commit }) {
    commit('duplicateVersion')
  },
  async deleteVersion ({ commit }) {
    commit('deleteVersion')
  },
  async resetEditor({ commit }) {
    commit('resetEditor')
  }
}

const mutations = {
  openDocument (state, document) {
    state.editor = true
    state.template = null
    state.document = document
  },
  closeDocument (state) {
    state.editor = false
  },
  setDocumentContent (state, content) {
    state.allContentVersions = content || empty
  },
  readTemplate (state, template) {
    state.template = template
  },
  setTemplateContent (state, content) {
    // console.log('editor.module mutation setTemplateContent %o', content)
    state.allContentVersions = content || empty
  },
  setContentBuffer (state, content) {
    // console.log('editor.module mutation setContentBuffer: %o, version: %o', content.content, content.version)
    state.content = content.content
    state.allContentVersions[content.version].content = content.content
  },
  changeVersion (state, version) {
    // console.log('editor.module.changeVersion mutation version', version)
    state.contentVersion = version
    state.content = state.allContentVersions[version].content
    // console.log('editor.module.changeVersion mutation content', state.content)
  },
  newVersion (state) {
    state.allContentVersions.push(Object.assign({}, empty[0]))
    state.contentVersion = state.allContentVersions.length - 1
    state.allContentVersions[state.contentVersion].versionName = 'Version ' + (state.contentVersion + 1)
  },
  renameVersion (state, newname) {
    state.allContentVersions[state.contentVersion].versionName = newname
  },
  duplicateVersion (state) {
    const duplicated = {}
    duplicated.content = state.allContentVersions[state.contentVersion].content
    duplicated.name = state.allContentVersions[state.contentVersion].versionName + '(copy)'
    state.allContentVersions.push(duplicated)
    state.contentVersion = state.allContentVersions.length - 1
  },
  deleteVersion (state) {
    console.log('state.allContentVersions length before', state.allContentVersions.length)
    state.allContentVersions.splice(state.contentVersion, 1)
    console.log('state.allContentVersions length AFTER', state.allContentVersions.length)
    if (state.contentVersion > 0) {
      console.log('mutation deleteVersion version > 0', state.contentVersion)
      state.content = state.allContentVersions[--state.contentVersion].content
    } else {
      console.log('mutation deleteVersion version =< 0', state.contentVersion)
      state.content = state.allContentVersions[state.contentVersion].content
    }
  },
  resetEditor (state) {
    state.document = null,
    state.template = null,
    state.content = null,
    state.allContentVersions = [],
    state.contentVersion = 0
  }
}
export const editor = {
  namespaced: true,
  state,
  actions,
  mutations
}
