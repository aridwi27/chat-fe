import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import css from '../src/assets/css/style.css'
import vuex from 'vuex'
import VueSweetalert2 from 'vue-sweetalert2'
import store from './store/index'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'vue-moment'

Vue.use(moment)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(css)
Vue.use(vuex)
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyChI84rTFDMKgY-pfd_j4fNnHJER5kJFxc'
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
