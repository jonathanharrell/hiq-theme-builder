<template>
    <div class="color-input">
        <popper trigger="click" :options="{ placement: 'bottom-start' }">
            <div class="controls" role="menu">
                <variable-select type="color" @select="handleVariableSelect"></variable-select>
                <h5>Value</h5>
                <color-picker
                    :value="resolvedColor"
                    @input="updateColorValue"
                ></color-picker>
            </div>
            <button
                slot="reference"
                class="current-value"
            >
                <span class="color-swatch" :style="{ backgroundColor: resolvedColor }"></span>
                <span class="color-string">{{ value }}</span>
            </button>
        </popper>
    </div>
</template>

<script>
    import Popper from 'vue-popperjs'
    import VariableSelect from './VariableSelect'
    import ColorPicker from './ColorPicker'

    export default {
        name: 'color-input',

        components: {
            Popper,
            VariableSelect,
            ColorPicker
        },

        props: {
            value: {
                type: String,
                required: true
            }
        },

        computed: {
            resolvedColor () {
                if (this.value.startsWith('var')) {
                    const variableName = this.value
                        .replace('var(', '')
                        .slice(0, -1)
                    return this.$store.state.variables[variableName].value
                }
                return this.value
            }
        },

        methods: {
            handleVariableSelect (value) {
                this.$emit('input', value)
            },

            updateColorValue (value) {
                this.$emit('input', value)
            }
        }
    }
</script>

<style scoped>
    .color-input {
        position: relative;
    }

    button {
        width: 100%;
        height: 2.5rem;
        justify-content: flex-start;
        padding: 0 0.5rem;
        border-color: var(--hiq-gray-lighter);
        background-color: white;
        font-weight: var(--hiq-font-weight-normal);
        color: var(--hiq-text-color);
    }

    .color-swatch {
        display: inline-block;
        width: 1.25rem;
        height: 1.25rem;
        margin-right: 0.5rem;
        border: 1px solid var(--hiq-gray-lighter);
        border-radius: var(--hiq-border-radius);
    }

    .controls {
        width: 100%;
        z-index: 10;
        padding: 1rem;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        background-color: white;
    }

    .vc-chrome {
        width: 100%;
        box-shadow: none;
    }
</style>
