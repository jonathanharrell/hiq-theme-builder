<template>
    <div class="editor-settings">
        <button @click="exportVariables">Export</button>
    </div>
</template>

<script>
    export default {
        name: 'editor-settings',

        computed: {
            variables () {
                return this.$store.state.variables
            }
        },

        methods: {
            exportVariables () {
                const variablesByCategory = Object.entries(this.variables)
                    .reduce((obj, item) => {
                        const [ variable, config ] = item
                        if (!obj[config.category]) obj[config.category] = {}
                        obj[config.category][variable] = config
                        return obj
                    }, {})

                const categoriesWithVariableStrings = Object.entries(variablesByCategory)
                    .reduce((obj, item) => {
                        const [ category, variables ] = item
                        obj[category] = Object.entries(variables).map(entry => {
                            const [ variable, config ] = entry
                            return `${variable}: ${config.value};`
                        }).join('\n  ')
                        return obj
                    }, {})

                const variablesString = Object.entries(categoriesWithVariableStrings)
                    .map(entry => {
                        let [ category, variablesString ] = entry
                        category = category.split('-').join(' ')
                        return `  /* ${category} */\n  ${variablesString}`
                    }).join('\n\n')

                const finalString = `/* variables */\n\n:root {\n${variablesString}\n}`

                const link = document.createElement('a')
                link.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(finalString)}`)
                link.setAttribute('download', 'variables.css')
                link.style.display = 'none'

                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
        }
    }
</script>

<style scoped>
    .editor-settings {
        flex: 0 0 12rem;
        border-left: 1px solid var(--hiq-gray-lighter);
        background-color: hsl(0, 0%, 98%);
    }
</style>
