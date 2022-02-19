import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/animate.css3.5.1.css'
import { Popup } from 'vant'
import 'vant/lib/popup/style'
Vue.config.productionTip = false

Vue.use(Popup);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
document.title="Matrix"
