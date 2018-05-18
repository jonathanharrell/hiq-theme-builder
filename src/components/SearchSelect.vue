<template>
    <div class="search-select">
        <popper
            trigger="click"
            :options="{ placement: 'bottom-start' }"
            ref="popper"
        >
            <ul class="select-options is-unstyled" role="menu" ref="options">
                <li
                    v-for="(option, index) in filteredOptions"
                    :key="index"
                    :class="{ highlighted: highlightedIndex === index }"
                    @click="handleClick(option)"
                >
                    <slot :option="option">
                        {{ option }}
                    </slot>
                </li>
            </ul>
            <input
                slot="reference"
                type="text"
                :value="inputValue"
                :placeholder="placeholder"
                @keydown="handleKeydown"
                @input="handleInput"
            >
        </popper>
    </div>
</template>

<script>
    import Popper from 'vue-popperjs'

    export default {
        name: 'search-select',

        components: {
            Popper
        },

        props: {
            placeholder: {
                type: String,
                default: ''
            },

            options: {
                type: Array,
                required: true
            },

            filterMethod: {
                type: Function,
                required: true
            }
        },

        data () {
            return {
                inputValue: '',
                highlightedIndex: 0
            }
        },

        computed: {
            filteredOptions () {
                return this.filterMethod(this.options, this.inputValue)
            }
        },

        methods: {
            highlight (index) {
                this.highlightedIndex = index

                if (this.highlightedIndex > this.filteredOptions.length - 1) {
                    this.highlightedIndex = 0
                }

                if (this.highlightedIndex < 0) {
                    this.highlightedIndex = this.filteredOptions.length - 1
                }

                this.$refs.options.children[this.highlightedIndex].scrollIntoView()
            },

            highlightNext () {
                this.highlight(this.highlightedIndex + 1)
            },

            highlightPrev () {
                this.highlight(this.highlightedIndex - 1)
            },

            handleKeydown (event) {
                if (event.key === 'ArrowDown') {
                    event.stopPropagation()
                    this.highlightNext()
                }
                if (event.key === 'ArrowUp') {
                    event.stopPropagation()
                    this.highlightPrev()
                }
                if (event.key === 'Enter') {
                    const selectedOption = this.filteredOptions[this.highlightedIndex]
                    if (selectedOption) this.selectOption(selectedOption)
                }
            },

            handleInput (event) {
                this.inputValue = event.target.value
                if (this.$refs.popper) this.$refs.popper.doShow()
            },

            handleClick (option) {
                this.selectOption(option)
            },

            selectOption (option) {
                this.inputValue = ''
                this.$emit('input', option)
                if (this.$refs.popper) this.$refs.popper.doClose()
            }
        }
    }
</script>

<style scoped>
    .search-select {
        position: relative;
    }

    .select-options {
        z-index: 10;
        width: 100%;
        max-height: 17.5rem;
        overflow-y: auto;
        padding: 0.25rem 0;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        background-color: white;
        & li {
            display: flex;
            align-items: center;
            padding: 0.125rem 0.5rem;
            cursor: pointer;
            &:hover,
            &:focus,
            &:active,
            &.highlighted {
                background-color: var(--hiq-selection-color);
            }
        }
    }
</style>
