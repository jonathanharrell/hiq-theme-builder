import Vue from 'vue'
import firebase from 'firebase/app'
import './firebase'
import store from './store'
import App from './components/App'
import router from './router'

let app

firebase.auth().onAuthStateChanged(user => {
    // store.commit('setCurrentUser', user)

    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        })
    }
})
