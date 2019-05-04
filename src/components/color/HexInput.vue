<template>
    <div class="hex-input">
        <div>
            <input
                type="text"
                id="hex"
                name="hex"
                :value="colorString"
                @input="updateColor"
            >
            <label for="hex">HEX</label>
        </div>
    </div>
</template>

<script>
    import tinycolor from 'tinycolor2'

    export default {
        name: 'hex-input',

        props: {
            value: {
                type: String,
                required: true
            }
        },

        computed: {
            colorString () {
                const color = tinycolor(this.value)
                return color.toHex()
            }
        },

        methods: {
            updateColor (event) {
                let value = event.target.value
                value = value.replace('#', '')

                if (value.length === 6) {
                    const color = tinycolor(value).toHsv()
                    this.$emit('input', color)
                }
            }
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
