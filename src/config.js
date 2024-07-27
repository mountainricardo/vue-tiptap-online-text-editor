export const api = Object.freeze({
	apiUrl: 'https://api.quickscript.io/v1',
	user: {
		login: '/users/login',
		users: '/users/',
		byEmail: '/users/?email=',
		byFullname: '/users/?fullname=',
		welcome: '/welcome',
		else: '/'
	},
	workspace: {
		workspaces: '/workspaces'
	},
	directory: {
		directories: '/directories'
	},
	file: {
		files: '/files',
		content: '/content',
		page: 'page=',
		size: 'size=',
		sort: 'sort',
		archived: 'archived='
	},
	template: {
		templates: '/templates',
		content: '/content'
	},
	defaultContent: {
          "type": "doc",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Empty document"
                }
              ]
            }
          ]
        }
})


