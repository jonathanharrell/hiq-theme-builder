import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        variables: {},
        theme: 'light'
    },

    mutations: {
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

        setTheme (state, theme) {
            state.theme = theme
        }
    }
})

export default store
