<template>
    <div class="text-input">
        <popper trigger="click" :options="{ placement: 'bottom-start' }">
            <div class="controls" role="menu">
                <variable-select type="text" @select="handleVariableSelect"></variable-select>
                <h5>Value</h5>
            </div>
            <button
                slot="reference"
                class="current-value"
            >
                {{ value }}
            </button>
        </popper>
    </div>
</template>

<script>
    import Popper from 'vue-popperjs'
    import VariableSelect from './VariableSelect'

    export default {
        name: 'text-input',

        components: {
            Popper,
            VariableSelect
        },

        props: {
            value: {
                type: String,
                required: true
            }
        },

        methods: {
            handleVariableSelect (value) {
                this.$emit('input', value)
            }
        }
    }
</script>

<style scoped>
    button {
        width: 100%;
        justify-content: flex-start;
    }
</style>
