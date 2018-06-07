<template>
    <div id="app" class="app-wrapper" :class="['theme-' + editorTheme]">
        <div v-if="loading">Loading...</div>
        <editor v-else></editor>
    </div>
</template>

<script>
    import axios from 'axios'
    import Editor from './Editor'

    export default {
        name: 'app',

        components: {
            Editor
        },

        data () {
            return {
                loading: false
            }
        },

        computed: {
            editorTheme () {
                return this.$store.state.editorTheme
            }
        },

        created () {
            this.getVariableConfig()
        },

        methods: {
            async getVariableConfig () {
                this.loading = true

                const { data } = await axios.get('https://raw.githubusercontent.com/jonathanharrell/hiq/master/_data/custom-properties.yml')
                const variableConfig = this.extractConfig(data)
                const defaultValues = await this.getDefaultValueData()

                Object.keys(variableConfig).forEach(variable => {
                    const defaultValue = defaultValues[variable]
                    if (defaultValue) variableConfig[variable].default = defaultValue
                })

                this.storeVariables(variableConfig)
                this.loading = false
            },

            extractConfig (data) {
                return data
                    .split('- ')
                    .filter(block => block.length)
                    .map(block => {
                        return block
                            .split('\n ')
                            .reduce((obj, item) => {
                                const [ key, value ] = item.split(':')
                                obj[key.trim()] = value
                                    .trim()
                                    .replace(/"/g, '')
                                return obj
                            }, {})
                    }).reduce((obj, item) => {
                        const variable = item.name
                        delete item.name
                        obj[variable] = {...item}
                        return obj
                    }, {})
            },

            async getDefaultValueData () {
                const { data } = await axios.get('https://raw.githubusercontent.com/jonathanharrell/hiq/master/pcss/variables.pcss')
                return this.extractDefaultValues(data)
            },

            extractDefaultValues (data) {
                return data
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line.startsWith('--'))
                    .reduce((obj, item) => {
                        const [ variable, ...value ] = item.split(':')

                        // special treatment for embedded svg image
                        if (value[0] === ' url(\'data') value[0] = 'url(data:'

                        obj[variable] = value
                            .join('')
                            .trim()
                            .replace(';', '')
                        return obj
                    }, {})
            },

            storeVariables (data) {
                Object.entries(data).forEach(entry => {
                    const [ variable, config ] = entry
                    data[variable].value = config.default
                })

                this.$store.commit('setDefaultVariables', data)

                const storedVariables = localStorage.getItem('hiqThemeBuilderVariables')
                if (storedVariables) this.$store.commit('setVariables', JSON.parse(storedVariables))
                else this.$store.commit('setVariables', data)
            }
        }
    }
</script>

<style>
    @import '../../node_modules/hiq/dist/hiq.css';
    @import '../assets/css/variables.css';
    @import '../assets/css/dark-theme.css';
    @import '../assets/css/global.css';
</style>
