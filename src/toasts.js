import Vue from 'vue'
import Toasted from 'vue-toasted'
Vue.use(Toasted)
Vue.toasted.register('loginError', 'Wrong Email or password!', {
  type: 'error',
  duration: 2000
})
Vue.toasted.register('noInternet', 'No Internet Connection!', {
  type: 'error',
  duration: 2000
})
Vue.toasted.register('unknownError', 'Something went wrong!', {
  type: 'error',
  duration: 2000
})