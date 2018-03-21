// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import * as firebase from 'firebase'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueMoment from 'vue-moment'
import { store } from './store'

import DateFilter from './filters/date'
import FirebaseConfig from './firebase/config'

import AlertComp from './components/utils/Alert'

Vue.filter('dateFormat', DateFilter)

Vue.use(Vuetify)
Vue.use(VueMoment)

Vue.component('app-alert', AlertComp)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    firebase.initializeApp(FirebaseConfig),
    this.$store.dispatch('loadMeetups');
  }
})
