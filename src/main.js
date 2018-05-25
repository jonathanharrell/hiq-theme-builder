import Vue from 'vue'
import store from './store'
import App from './components/App'
import router from './router'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})
