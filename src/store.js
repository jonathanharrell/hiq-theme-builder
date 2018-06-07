import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const storedEditorTheme = localStorage.getItem('hiqThemeBuilderEditorTheme')
const storedThemeName = localStorage.getItem('hiqThemeBuilderThemeName')

const store = new Vuex.Store({
    state: {
        defaultVariables: {},
        variables: {},
        editorTheme: storedEditorTheme || 'light',
        themeName: storedThemeName || 'Untitled Theme'
    },

    mutations: {
        setDefaultVariables (state, variables) {
            state.defaultVariables = variables
        },

        setVariables (state, variables) {
            state.variables = variables
            localStorage.setItem('hiqThemeBuilderVariables', JSON.stringify(variables))
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
        }
    }
})

export default store
