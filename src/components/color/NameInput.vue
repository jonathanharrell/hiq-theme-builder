<template>
    <div class="name-input">
        <label for="name">Name</label>
        <input
            type="text"
            id="name"
            name="name"
            :value="colorString"
            @input="updateColor"
        >
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
