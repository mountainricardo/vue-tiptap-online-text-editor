import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import vuetify from './plugins/vuetify'
import i18n from './i18n'
import VeeValidate from 'vee-validate'
// import VueMoment from 'vue-moment'
import './sass/main.scss'
import './sass/variables.scss'

Vue.config.productionTip = false

Vue.use(VeeValidate)
Vue.use(require('vue-moment'))

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
