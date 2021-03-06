import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import './utils/register-vant'
import 'normalize.css'
import './styles/index.less'
import './utils/validation'
// import { Button, Cell, CellGroup } from 'vant'
// Vue.use(Button).use(Cell).use(CellGroup)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
