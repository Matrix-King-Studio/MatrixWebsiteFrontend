import Vue from 'vue'
import resetMessage from './plugins/resetMessage'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/animate.css3.5.1.css'
import { Popup } from 'vant'
import 'vant/lib/popup/style'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$message = resetMessage;
Vue.use(Popup);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
document.title="Matrix"
