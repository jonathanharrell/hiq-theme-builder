import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        variables: {}
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
        }
    }
})

export default store
