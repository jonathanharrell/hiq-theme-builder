import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'
import SignIn from './components/SignIn'
import Themes from './components/Themes'
import Editor from './components/Editor'
import Preview from './components/Preview'

Vue.use(VueRouter)

const routes = [
    {
        name: 'sign-in',
        path: '/sign-in',
        component: SignIn
    },
    {
        name: 'themes',
        path: '/themes',
        component: Themes,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'theme',
        path: '/theme/:id?',
        redirect: '/theme/:id?/colors',
        component: Editor,
        children: [
            {
                name: 'editor-category',
                path: '/theme/:id?/:category',
                component: Preview
            }
        ]
    },
    {
        path: '/theme-builder',
        redirect: '/'
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !currentUser) next('sign-in')
    if (to.path === '/') {
        if (currentUser) next('themes')
        else next('theme')
    }

    if (to.path === '/theme/theme') {
        next('/theme/colors')
    }

    if (currentUser && to.name === 'editor-category' && !to.params.id) next('themes')
    else next()
})

export default router
