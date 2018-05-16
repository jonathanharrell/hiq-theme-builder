import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import App from './components/App'
import Preview from './components/Preview'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/colors'
    },
    {
        name: 'editor-category',
        path: '/:category',
        component: Preview
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})
