import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import firebase from 'firebase/app'
import './firebase'
import store from './store'
import App from './components/App'
import router from './router'

// error tracking
Raven
    .config('https://b298f8fc3bf54e4586a15933c971afe2@sentry.io/1251687')
    .addPlugin(RavenVue, Vue)
    .install()

let app

firebase.auth().onAuthStateChanged(user => {
    store.commit('setCurrentUser', user)
    store.dispatch('clearTempData')

    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        })
    }
})
