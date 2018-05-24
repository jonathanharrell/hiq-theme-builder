<template>
    <div id="app" :class="['theme-' + theme]">
        <editor></editor>
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

        computed: {
            theme () {
                return this.$store.state.theme
            }
        },

        created () {
            this.getVariableConfig()
        },

        methods: {
            async getVariableConfig () {
                const { data } = await axios.get('https://raw.githubusercontent.com/jonathanharrell/hiq/master/_data/custom-properties.yml')
                const variableConfig = this.extractConfig(data)
                const defaultValues = await this.getDefaultValueData()

                Object.keys(variableConfig).forEach(variable => {
                    const defaultValue = defaultValues[variable]
                    if (defaultValue) variableConfig[variable].default = defaultValue
                })

                this.storeVariables(variableConfig)
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

                this.$store.commit('setVariables', data)
            }
        }
    }
</script>

<style>
    @import '../../node_modules/hiq/dist/hiq.css';

    :root {
        /* gray palette */
        --hiq-gray-darkest: hsl(220, 10%, 5%);
        --hiq-gray-darker: hsl(220, 10%, 10%);
        --hiq-gray-dark: hsl(220, 10%, 20%);
        --hiq-gray: hsl(220, 10%, 40%);
        --hiq-gray-light: hsl(220, 10%, 60%);
        --hiq-gray-lighter: hsl(220, 10%, 90%);
        --hiq-gray-lightest: hsl(220, 10%, 95%);

        /* semantic palette */
        --hiq-color-primary: hsl(210, 100%, 50%);
        --hiq-color-success: hsl(158, 73%, 48%);
        --hiq-color-warning: hsl(46, 97%, 64%);
        --hiq-color-danger: hsl(352, 95%, 61%);

        /* applied colors */
        --hiq-selection-color: hsl(210, 100%, 90%);

        --hiq-container-horizontal-gap: 1rem;

        /* unitless base font size variables in px */
        --hiq-unitless-min-font-size: 14;
        --hiq-unitless-max-font-size: 15;

        /* font sizes */
        --hiq-font-size-1: 2.5rem;
        --hiq-font-size-2: 2rem;
        --hiq-font-size-3: 1.75rem;
        --hiq-font-size-4: 1.5rem;
        --hiq-font-size-5: 1rem;
        --hiq-font-size-6: 0.875rem;
        --hiq-font-size-base: var(--hiq-font-size-5);
        --hiq-font-size-large: var(--hiq-font-size-4);
        --hiq-font-size-small: var(--hiq-font-size-6);

        --hiq-border-radius: 4px;

        --hiq-input-border-color: var(--hiq-gray-lighter);
        --hiq-input-background-color: white;

        --navbar-background-color: white;
        --editor-nav-background-color: white;
        --editor-nav-border-color: var(--hiq-gray-lighter);
        --tooltip-background-color: var(--hiq-gray-dark);
        --editor-panel-background-color: hsl(220, 10%, 98%);
        --editor-panel-border-color: var(--hiq-gray-lighter);
        --label-color: var(--hiq-gray);
        --info-icon-color: var(--hiq-gray-lighter);
        --controls-background-color: white;
        --pill-background-color: var(--hiq-gray-lightest);
        --editor-preview-background-color: var(--hiq-gray-lightest);
    }

    .theme-dark {
        --hiq-text-color: var(--hiq-gray-lighter);
        --hiq-selection-color: var(--hiq-gray-darker);
        --hiq-input-border-color: var(--hiq-gray-darker);
        --hiq-input-background-color: var(--hiq-gray-dark);
        --hiq-input-placeholder-color: var(--hiq-gray-light);

        --navbar-background-color: var(--hiq-gray-dark);
        --editor-nav-background-color: var(--hiq-gray-dark);
        --editor-nav-border-color: var(--hiq-gray-darker);
        --tooltip-background-color: var(--hiq-gray-darkest);
        --editor-panel-background-color: hsl(220, 10%, 15%);
        --editor-panel-border-color: var(--hiq-gray-darker);
        --label-color: var(--hiq-gray-light);
        --info-icon-color: var(--hiq-gray);
        --controls-background-color: var(--hiq-gray-dark);
        --pill-background-color: var(--hiq-gray-darker);
        --editor-preview-background-color: var(--hiq-gray-darker);
    }

    .tooltip {
        z-index: 1000;
        padding: 0.25rem 0.5rem;
        border-radius: var(--hiq-border-radius);
        background-color: var(--tooltip-background-color);
        font-size: var(--hiq-font-size-small);
        color: var(--hiq-gray-lighter);
    }
</style>
