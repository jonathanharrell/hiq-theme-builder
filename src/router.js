import Vue from 'vue'
import VueRouter from 'vue-router'
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

export default router
