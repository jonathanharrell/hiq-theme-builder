import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentUser: null,
        defaultVariables: {},
        variables: {},
        editorTheme: 'light',
        themeName: 'Untitled Theme',
        themes: []
    },

    mutations: {
        setCurrentUser (state, user) {
            state.currentUser = user
        },

        setDefaultVariables (state, variables) {
            state.defaultVariables = variables
        },

        setVariables (state, variables) {
            const reorderedVariables = {}

            for (let variable in state.defaultVariables) {
                reorderedVariables[variable] = variables[variable]
            }

            state.variables = reorderedVariables
            localStorage.setItem('hiqThemeBuilderVariables', JSON.stringify(reorderedVariables))
        },

        updateVariable (state, { name, value }) {
            state.variables = {
                ...state.variables,
                [name]: {
                    ...state.variables[name],
                    value
                }
            }

            localStorage.setItem('hiqThemeBuilderVariables', JSON.stringify(state.variables))
        },

        setEditorTheme (state, theme) {
            state.editorTheme = theme
            localStorage.setItem('hiqThemeBuilderEditorTheme', theme)
        },

        setThemeName (state, name) {
            state.themeName = name
            localStorage.setItem('hiqThemeBuilderThemeName', name)
        },

        setThemes (state, themes) {
            state.themes = themes
        }
    },

    actions: {
        clearTempData ({ commit }) {
            commit('setDefaultVariables', {})
            commit('setVariables', {})
            commit('setEditorTheme', 'light')
            commit('setThemeName', 'Untitled Theme')
        }
    }
})

export default store
