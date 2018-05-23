<template>
    <div class="number-input" @keydown="handleKeydown">
        <popper
            trigger="click"
            :options="{ placement: 'bottom-start' }"
            ref="popper"
        >
            <div class="controls" role="menu">
                <div class="unit-options">
                    <button
                        v-for="unit in units"
                        :key="unit"
                        :class="{ active: activeUnit === unit}"
                        @click="updateUnit(unit)"
                    >
                        {{ unit }}
                    </button>
                    <button :class="{ active: activeUnit === null}" @click="updateUnit(null)">
                        none
                    </button>
                </div>
                <variable-select
                    type="number"
                    :name="name"
                    @select="handleVariableSelect"
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
    import Popper from 'vue-popperjs'
    import VariableSelect from './VariableSelect'

    export default {
        name: 'number-input',

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

        data () {
            return {
                units: ['px', 'em', 'rem']
            }
        },

        computed: {
            isVariable () {
                return this.value.startsWith('var(')
            },

            resolvedValue () {
                let value = this.value

                while (value.startsWith('var')) {
                    console.log(value)
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

            handleInput (event) {
                if (this.$refs.popper) this.$refs.popper.doShow()
                this.$emit('input', `${event.target.value}${this.activeUnit || ''}`)
            },

            handleInputKeydown (event) {
                if (event.key === 'Enter') {
                    if (this.$refs.popper) this.$refs.popper.doClose()
                }
            },

            updateUnit (unit) {
                this.$emit('input', `${this.unitlessValue}${unit || ''}`)
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
        background-color: white;
    }

    .unit-options {
        display: flex;
        & * {
            flex: 1;
        }
        & button {
            margin-bottom: 0.5rem;
            padding: 0 0.5rem;
            border-color: var(--hiq-gray-lighter);
            border-radius: 0;
            background-color: transparent;
            font-size: var(--hiq-font-size-small);
            font-weight: var(--hiq-font-weight-normal);
            color: var(--hiq-gray);
            &.active {
                border-color: var(--hiq-color-primary);
                color: var(--hiq-color-primary);
            }
        }
    }

    .input-wrapper {
        display: flex;
        align-items: center;
        border: 1px solid var(--hiq-gray-lighter);
        border-radius: var(--hiq-border-radius);
        background-color: white;
        &:focus-within {
            box-shadow: 0 0 0 var(--hiq-outline-width, 0.2rem) var(--hiq-outline-color, hsl(210, 100%, 85%));
        }
    }

    input {
        flex: 1;
        padding-left: 0.5rem;
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
        background-color: var(--hiq-gray-lightest);
        font-size: var(--hiq-font-size-small);
        color: var(--hiq-gray-light);
    }

    .resolved-value {
        margin-left: 0.5rem;
    }

    input {

    }

    .active-unit {
        margin-right: 0.5rem;
        & del {
            background-color: transparent;
        }
    }
</style>
