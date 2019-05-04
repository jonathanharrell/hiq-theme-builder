<template>
    <div id="app" class="app-wrapper" :class="['theme-' + editorTheme]">
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
        >
            <loader v-if="loading"></loader>
            <router-view v-else></router-view>
        </transition>
        <p v-if="error" class="app-error">
            There was a problem loading the theme editor.
        </p>
    </div>
</template>

<script>
    import axios from 'axios'
    import Loader from './Loader'
    import Editor from './Editor'

    export default {
        name: 'app',

        components: {
            Loader,
            Editor
        },

        data () {
            return {
                loaded: false,
                loading: false,
                error: false
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

                const timer = setInterval(() => {
                    if (this.loaded) {
                        this.loading = false
                        clearInterval(timer)
                    }
                }, 1000)

                try {
                    const { data } = await axios.get('https://raw.githubusercontent.com/jonathanharrell/hiq/master/docs/.vuepress/data/custom-properties.js')
                    const variableConfig = this.extractConfig(data)
                    const defaultValues = await this.getDefaultValueData()

                    Object.keys(variableConfig).forEach(variable => {
                        const defaultValue = defaultValues[variable]
                        if (defaultValue) variableConfig[variable].default = defaultValue
                    })

                    this.storeVariables(variableConfig)
                    this.loaded = true
                } catch (error) {
                    this.loading = false
                    this.error = true
                    console.log(error)
                }
            },

            extractConfig (data) {
                const config = data
                    .replace('module.exports = ', '')
                    .replace(/:/g, '":')
                    .replace(/ {8}/g, '        "')
                    .replace(/,\n {4}}/g, '\n    }')
                    .replace(';', '')

                return JSON
                    .parse(config)
                    .reduce((obj, item) => {
                        const variable = item.name
                        delete item.name
                        obj[variable] = {...item}
                        return obj
                    }, {})
            },

            async getDefaultValueData () {
                const { data } = await axios.get('https://raw.githubusercontent.com/jonathanharrell/hiq/master/css/variables.css')
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
                this.$store.commit('setVariables', data)
            }
        }
    }
</script>

<style>
    @import '../../node_modules/hiq/dist/hiq.css';
    @import '../../node_modules/animate.css/animate.css';
    @import '../assets/css/variables.css';
    @import '../assets/css/dark-theme.css';
    @import '../assets/css/global.css';
    @import '../assets/css/navbar.css';
    @import '../assets/css/loading.css';

    .app-wrapper {
        position: fixed;
        width: 100vw;
        background-color: var(--editor-preview-background-color);
    }

    .app-error {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-color: var(--hiq-color-gray-7);
    }
</style>
