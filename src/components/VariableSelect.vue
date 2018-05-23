<template>
    <div class="variable-select">
        <search-select
            placeholder="Search variables"
            :options="variableOptions"
            :filterMethod="filterMethod"
            @input="handleInput"
        >
            <template slot-scope="{ option }">
                <span class="color-swatch" :style="{ backgroundColor: option[1].value }" v-if="option[1].type === 'color'"></span>
                <span class="variable-name" :title="option[1].value">{{ option[0] }}</span>
            </template>
        </search-select>
    </div>
</template>

<script>
    import SearchSelect from './SearchSelect'

    export default {
        name: 'variable-select',

        components: {
            SearchSelect
        },

        props: {
            type: {
                type: String,
                required: true
            },

            name: {
                type: String,
                required: true
            }
        },

        computed: {
            variableOptions () {
                return Object.entries(this.$store.state.variables)
                    .filter(entry => entry[1].type === this.type)
                    .filter(entry => entry[0] !== this.name)
            }
        },

        methods: {
            filterMethod (options, query) {
                return options.filter(option => option[0].toLowerCase().includes(query.toLowerCase()))
            },

            handleInput (option) {
                this.inputValue = option[0]
                this.$emit('select', `var(${option[0]})`)
            }
        }
    }
</script>

<style scoped>
    .color-swatch {
        display: inline-block;
        width: 1.25rem;
        height: 1.25rem;
        margin-right: 0.5rem;
        border: 1px solid var(--hiq-gray-lighter);
        border-radius: var(--hiq-border-radius);
    }

    .variable-name {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
