import Vue from 'vue'
import VueRouter from 'vue-router'

// import Recent from '../views/Recent.vue'
import Documents from '../views/Documents.vue'
import TextEditor from '../views/TextEditor.vue'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'

import Store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Documents
  },
  {
    path: '/recent',
    name: 'Recent',
    component: () => import('../views/Recent.vue')

  },
  {
    path: '/documents',
    name: 'Documents',
    component: () => import('../views/Documents.vue')

  },
  {
    path: '/templates',
    name: 'Templates',
    component: () => import('../views/Templates.vue')

  },
  {
    path: '/archived',
    name: 'Vue Archived',
    component: () => import('../views/Archived.vue')

  },
  {
    path: '/users/:userid/workspaces/:workspaceid/directories/:directoryid',
    name: 'Folder',
    component: () => import('../views/Directory.vue')

  },
  {
    path: '/users/:userid/workspaces/:workspaceid/directories/:directoryid/files/:fileid/content',
    name: 'Editor',
    component: TextEditor
  },
  {
    path: '/users/:userid/templates/:templateid/content',
    name: 'TemplateEditor',
    component: TextEditor
  },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },

  // otherwise redirect to home
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [ '/login', '/register' ]
  const authRequired = !publicPages.includes(to.path)
  // const loggedIn = localStorage.getItem('user')
  const loggedIn = Store.state.account.status.loggedIn
  // const selected = Store.state.nav.selectedDocument

  if (authRequired && !loggedIn) {
    return next('/login')
  }
  // console.log('selected', selected)
  // if ( selected === 0) {
  //   return next('/*')
  // }

  next()
})

export default router
