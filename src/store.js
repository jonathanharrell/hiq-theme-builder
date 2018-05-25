import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        defaultVariables: {},
        variables: {},
        editorTheme: 'light'
    },

    mutations: {
        setDefaultVariables (state, variables) {
            state.defaultVariables = variables
        },

        setVariables (state, variables) {
            state.variables = variables
        },

        updateVariable (state, { name, value }) {
            state.variables = {
                ...state.variables,
                [name]: {
                    ...state.variables[name],
                    value
                }
            }
        },

        setEditorTheme (state, theme) {
            state.editorTheme = theme
        }
    }
})

export default store
