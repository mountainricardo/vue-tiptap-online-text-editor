// md
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
// fa4
// import 'font-awesome/css/font-awesome.min.css' // Ensure you are using css-loader
// icon
// import '@/assets/icomoon/style.css'
import '@/assets/scss/style.scss'

import Vue from 'vue'
// import Vuetify from 'vuetify/lib/framework'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  // iconfont: 'mdiSvg',  'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  // iconfont: 'md',
  // iconfont: 'fa4'
  // iconfont: 'mdi'
  icons: {
    // iconfont: 'md',
    iconfont: 'icon'
  },
  theme: {
    themes: {
      light: {
        primary: '#4864e7',
        // primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
      dark: {
        // primary: '#2196F3',
        primary: colors.blue,
        secondary: '#424242',
        accent: '#FF4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
    dark: false
  }
})
