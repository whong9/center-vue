import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css';
import VueRouter from "vue-router";
import router from "@/router";
import store from "@/store";

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({
  el: '#app',
  router:router,
  render: h => h(App),
  store,
})
