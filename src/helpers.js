export const createVariablesString = (variables) => {
    const variablesByCategory = Object.entries(variables)
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

    return `/* variables */\n\n:root {\n${variablesString}\n}`
}
