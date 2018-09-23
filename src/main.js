// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './i18n/i18n'
import {getRequest, postRequest, putRequest, deleteRequest, uploadFileRequest, getRequestParams} from './utils/api'
import {isEmpty} from './utils/utils'

Vue.use(ElementUI)
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.uploadFileRequest = uploadFileRequest
Vue.prototype.getRequestParams = getRequestParams
Vue.prototype.isEmpty = isEmpty

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
