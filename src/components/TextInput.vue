<template>
    <div class="text-input" @keydown="handleKeydown">
        <popper
            trigger="click"
            :options="{ placement: 'bottom-start' }"
            ref="popper"
        >
            <div class="controls" role="menu">
                <variable-select
                    type="text"
                    :name="name"
                    @select="handleVariableSelect"
                    ref="variable-select"
                    @tabbed-down-out="handleTabOut"
                    @tabbed-up-out="handleTabOut"
                ></variable-select>
            </div>
            <input
                slot="reference"
                type="text"
                :value="value"
                ref="input"
                @input="handleInput"
                @keydown="handleInputKeydown"
            />
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
            name: {
                type: String,
                required: true
            },

            value: {
                type: String,
                required: true
            }
        },

        methods: {
            handleVariableSelect (value) {
                if (this.$refs.popper) this.$refs.popper.doClose()
                this.$emit('input', value)
            },

            handleKeydown (event) {
                if (event.key === 'Escape') {
                    if (this.$refs.popper) this.$refs.popper.doClose()
                    this.$refs.input.focus()
                }
            },

            handleInput (event) {
                if (this.$refs.popper) this.$refs.popper.doShow()
                this.$emit('input', event.target.value)
            },

            handleInputKeydown (event) {
                if (event.key === 'Enter') {
                    if (this.$refs.popper) {
                        if (!this.$refs.popper.showPopper) {
                            this.$refs.popper.doShow()
                        } else {
                            this.$refs.popper.doClose()
                        }
                    }
                }

                if (event.key === 'Tab') {
                    this.$refs['variable-select'].focusInput()
                }
            },

            async handleTabOut () {
                this.$refs.popper.doClose()
                await this.$nextTick()
                this.$refs.input.focus()
            }
        }
    }
</script>

<style scoped>
    .text-input {
        position: relative;
    }

    .controls {
        z-index: 10;
        width: 100%;
        margin-top: 0.125rem;
        padding: 1rem;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        background-color: var(--controls-background-color);
    }

    input {
        padding-right: 0;
    }
</style>
