<template>
    <div class="hsl-inputs">
        <div>
            <label for="h">H</label>
            <input
                type="number"
                id="h"
                name="h"
                :value="Math.round(colorObject.h)"
                @input="updateColor"
            >
        </div>
        <div>
            <label for="s">S</label>
            <input
                type="text"
                id="s"
                name="s"
                :value="[`${Math.round(colorObject.s * 100)}%`]"
                @input="updateColor"
            >
        </div>
        <div>
            <label for="l">L</label>
            <input
                type="text"
                id="l"
                name="l"
                :value="[`${Math.round(colorObject.l * 100)}%`]"
                @input="updateColor"
            >
        </div>
    </div>
</template>

<script>
    import tinycolor from 'tinycolor2'
    import { debounce } from 'lodash'

    export default {
        name: 'hsl-inputs',

        props: {
            value: {
                type: String,
                required: true
            }
        },

        computed: {
            colorObject () {
                const color = tinycolor(this.value)
                return color.toHsl()
            }
        },

        methods: {
            updateColor: debounce(function (event) {
                let { name, value } = event.target
                if (name === 's' || name === 'l') {
                    value = parseInt(value.replace('%', '')) / 100
                }

                const colorObject = {
                    ...this.colorObject,
                    [name]: value
                }

                const color = tinycolor(colorObject).toHsv()
                this.$emit('input', color)
            }, 300)
        }
    }
</script>

<style scoped>
    .hsl-inputs {
        display: flex;
        & > * {
            flex: 1;
        }
    }
</style>
