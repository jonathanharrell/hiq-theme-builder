<template>
    <div class="color-input" @keydown="handleKeydown">
        <popper
            trigger="click"
            :options="{ placement: 'bottom-start' }"
            ref="popper"
            @show="handleShow"
        >
            <div class="controls" role="menu">
                <color-picker :value="resolvedColor" @input="updateColorValue"></color-picker>
                <variable-select type="color" :name="name" @select="handleVariableSelect"></variable-select>
            </div>
            <button slot="reference" class="current-value" ref="button">
                <color-swatch :color="resolvedColor"></color-swatch>
                <span class="color-string">{{ value }}</span>
            </button>
        </popper>
    </div>
</template>

<script>
    import Popper from 'vue-popperjs'
    import VariableSelect from '../VariableSelect'
    import ColorPicker from './ColorPicker'
    import ColorSwatch from '../base/ColorSwatch'

    export default {
        name: 'color-input',

        components: {
            Popper,
            VariableSelect,
            ColorPicker,
            ColorSwatch
        },

        props: {
            name: {
                type: String,
                required: true
            },

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
                if (this.$refs.popper) this.$refs.popper.doClose()
                this.$emit('input', value)
            },

            updateColorValue (value) {
                this.$emit('input', value)
            },

            handleKeydown (event) {
                if (event.key === 'Escape') {
                    if (this.$refs.popper) this.$refs.popper.doClose()
                    this.$refs.button.focus()
                }
            },

            async handleShow () {
                await this.$nextTick()
                this.$el.querySelector('input').focus()
            }
        }
    }
</script>

<style scoped>
    .color-input {
        position: relative;
        & > span {
            display: block;
        }
    }

    button {
        width: 100%;
        height: 2.5rem;
        justify-content: flex-start;
        padding: 0 0.5rem;
        border-color: var(--hiq-input-border-color);
        background-color: var(--hiq-input-background-color);
        font-weight: var(--hiq-font-weight-normal);
        color: var(--hiq-text-color);
    }

    .color-string {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
    }

    .controls {
        z-index: 10;
        width: 100%;
        margin-top: 0.125rem;
        padding: 1rem;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        background-color: var(--controls-background-color);
    }

    .variable-select {
        margin-top: 0.5rem;
    }
</style>
