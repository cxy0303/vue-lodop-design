// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/jquery-1.9.0.min.js'
import '../static/bootstrap/css/bootstrap.min.css'
import '../static/bootstrap//js/bootstrap.min.js'
import '../static/bootstraptreeview/bootstrap-treeview.min.css'
import '../static/bootstraptreeview/bootstrap-treeview.min.js'
import 'babel-polyfill'
import Vuebar from 'vuebar'
Vue.use(Vuebar);

import VModal from 'vue-js-modal'
Vue.use(VModal, { dialog: true })




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
