<template>
    <div class="hsl-inputs">
        <div>
            <input
                type="number"
                id="h"
                name="h"
                :value="Math.round(colorObject.h)"
                @input="updateColor"
            >
            <label for="h">H</label>
        </div>
        <div>
            <input
                type="text"
                id="s"
                name="s"
                :value="[`${Math.round(colorObject.s * 100)}%`]"
                @input="updateColor"
            >
            <label for="s">S</label>
        </div>
        <div>
            <input
                type="text"
                id="l"
                name="l"
                :value="[`${Math.round(colorObject.l * 100)}%`]"
                @input="updateColor"
            >
            <label for="l">L</label>
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
        margin: 0 -0.25rem;
        & > * {
            flex: 1;
            padding: 0 0.25rem;
        }
    }

    label {
        font-size: var(--hiq-font-size-small);
        font-weight: var(--hiq-font-weight-normal);
        text-align: center;
        color: var(--hiq-gray);
    }
</style>
