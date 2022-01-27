import Vue from 'vue'
import Users from './Users.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Users),
}).$mount('#app')
