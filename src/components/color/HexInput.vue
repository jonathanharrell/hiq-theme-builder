<template>
    <div class="hex-input">
        <div>
            <label for="hex">Hex</label>
            <input
                type="text"
                id="hex"
                name="hex"
                :value="colorString"
                @input="updateColor"
            >
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
