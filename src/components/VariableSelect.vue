<template>
    <div class="variable-select">
        <h5>Variable</h5>
        <select @change="handleChange">
            <option
                :value="option"
                :key="option"
                v-for="(config, option) in variableOptions"
            >
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        name: 'variable-select',

        props: {
            type: {
                type: String,
                required: true
            }
        },

        computed: {
            variableOptions () {
                return Object.entries(this.$store.state.variables)
                    .filter(entry => entry[1].type === this.type)
                    .reduce((obj, item) => {
                        const [ variable, config ] = item
                        obj[variable] = config
                        return obj
                    }, {})
            }
        },

        methods: {
            handleChange (event) {
                this.$emit('select', `var(${event.target.value})`)
            }
        }
    }
</script>
