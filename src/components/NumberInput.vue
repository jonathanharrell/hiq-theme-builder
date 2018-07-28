<template>
    <div class="number-input" @keydown="handleKeydown">
        <popper
            trigger="click"
            :options="{ placement: 'bottom-start' }"
            ref="popper"
        >
            <div class="controls" role="menu">
                <button-group class="unit-options">
                    <button
                        v-for="unit in units"
                        :key="unit"
                        :class="{ active: activeUnit === unit}"
                        @click="updateUnit(unit)"
                        @keydown.tab="handleUnitTab(unit, $event)"
                    >
                        {{ unit }}
                    </button>
                    <button :class="{ active: activeUnit === null}" @click="updateUnit(null)">
                        none
                    </button>
                </button-group>
                <variable-select
                    type="number"
                    :name="name"
                    @select="handleVariableSelect"
                    @tabbed-down-out="handleTabOut"
                    ref="variable-select"
                ></variable-select>
            </div>
            <div class="input-wrapper" slot="reference">
                <span class="resolved-value" v-if="isVariable" ref="resolvedValue">
                    {{ resolvedValue }}
                </span>
                <input
                    v-if="isVariable"
                    type="text"
                    :value="value"
                    ref="input"
                    @input="handleInput"
                    @keydown="handleInputKeydown"
                >
                <input
                    v-else
                    type="number"
                    :value="unitlessValue"
                    :step="step"
                    ref="input"
                    @input="handleInput"
                    @keydown="handleInputKeydown"
                />
                <span class="active-unit" v-if="activeUnit">{{ activeUnit }}</span>
                <span class="active-unit" v-if="!activeUnit && !isVariable"><del>unit</del></span>
            </div>
        </popper>
    </div>
</template>

<script>
    import { debounce } from 'lodash'
    import Popper from 'vue-popperjs'
    import ButtonGroup from './base/ButtonGroup'
    import VariableSelect from './VariableSelect'

    export default {
        name: 'number-input',

        components: {
            Popper,
            ButtonGroup,
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

        data () {
            return {
                units: ['px', 'em', 'rem']
            }
        },

        computed: {
            defaultMeasurementUnit () {
                return this.$store.state.editorDefaults.measurementUnit
            },

            isVariable () {
                return this.value.startsWith('var(')
            },

            resolvedValue () {
                let value = this.value

                while (value.startsWith('var')) {
                    const variableName = value
                        .replace('var(', '')
                        .slice(0, -1)
                    value = this.$store.state.variables[variableName].value
                }

                return value
            },

            activeUnit () {
                if (this.value.includes('px')) return 'px'
                if (this.value.includes('rem')) return 'rem'
                if (this.value.includes('em')) return 'em'
                return null
            },

            step () {
                if (this.activeUnit === 'em' || this.activeUnit === 'rem') {
                    return 0.25
                }

                return 1
            },

            unitlessValue () {
                if (this.activeUnit) {
                    const number = Number(this.value.replace(this.activeUnit, ''))
                    if (isNaN(number)) return 0
                    return number
                }

                return this.value
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

            handleInput: debounce(function (event) {
                if (this.$refs.popper) this.$refs.popper.doShow()
                this.$emit('input', `${event.target.value}${this.activeUnit || ''}`)
            }, 300),

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

            updateUnit (unit) {
                if (this.isVariable) {
                    this.$emit('input', `0${unit || ''}`)
                } else {
                    this.$emit('input', `${this.unitlessValue}${unit || ''}`)
                }
            },

            handleUnitTab (unit, event) {
                if (unit === 'px' && event.key === 'Tab' && event.shiftKey) {
                    this.handleTabOut()
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
    .number-input {
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

    .unit-options {
        margin-bottom: 0.5rem;
    }

    .input-wrapper {
        display: flex;
        align-items: center;
        border: 1px solid var(--hiq-input-border-color);
        border-radius: var(--hiq-border-radius);
        background-color: var(--hiq-input-background-color);
        &:focus-within {
            border-color: var(--hiq-input-focus-border-color);
            box-shadow: 0 0 0 var(--hiq-outline-width, 0.2rem) var(--hiq-outline-color, hsl(210, 100%, 85%));
        }
    }

    input {
        flex: 1;
        padding-left: 0.5rem;
        padding-right: 0;
        border-color: transparent;
        border-radius: 0;
        background-color: transparent;
        &:hover,
        &:focus,
        &:active {
            border-color: transparent;
            background-color: transparent;
            box-shadow: none;
        }
    }

    .resolved-value,
    .active-unit {
        padding: 0.125rem 0.5rem;
        border-radius: var(--hiq-border-radius);
        background-color: var(--pill-background-color);
        font-size: var(--hiq-font-size-small);
        color: var(--hiq-gray-light);
    }

    .resolved-value {
        margin-left: 0.5rem;
    }

    .active-unit {
        margin-right: 0.5rem;
        & del {
            background-color: transparent;
        }
    }
</style>
