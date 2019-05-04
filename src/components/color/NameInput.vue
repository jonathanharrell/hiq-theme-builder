<template>
    <div class="name-input">
        <input
            type="text"
            id="name"
            name="name"
            :value="colorString"
            @input="updateColor"
        >
        <label for="name">Name</label>
    </div>
</template>

<script>
    import tinycolor from 'tinycolor2'
    import { debounce } from 'lodash'

    export default {
        name: 'name-input',

        props: {
            value: {
                type: String,
                required: true
            }
        },

        computed: {
            colorString () {
                const color = tinycolor(this.value)
                const name = color.toName()
                return name || ''
            }
        },

        methods: {
            updateColor: debounce(function (event) {
                this.$emit('input', event.target.value)
            }, 300)
        }
    }
</script>

<style scoped>
    label {
        font-size: var(--hiq-font-size-small);
        font-weight: var(--hiq-font-weight-normal);
        text-align: center;
        color: var(--hiq-color-gray-4);
    }
</style>
