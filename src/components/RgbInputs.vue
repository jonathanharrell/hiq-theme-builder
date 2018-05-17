<template>
    <div class="rgb-inputs">
        <div>
            <label for="r">R</label>
            <input
                type="number"
                id="r"
                name="r"
                :value="colorObject.r"
                @input="updateColor"
            >
        </div>
        <div>
            <label for="g">G</label>
            <input
                type="number"
                id="g"
                name="g"
                :value="colorObject.g"
                @input="updateColor"
            >
        </div>
        <div>
            <label for="b">B</label>
            <input
                type="number"
                id="b"
                name="b"
                :value="colorObject.b"
                @input="updateColor"
            >
        </div>
    </div>
</template>

<script>
    import tinycolor from 'tinycolor2'

    export default {
        name: 'rgb-inputs',

        props: {
            value: {
                type: String,
                required: true
            }
        },

        computed: {
            colorObject () {
                const color = tinycolor(this.value)
                return color.toRgb()
            }
        },

        methods: {
            updateColor (event) {
                const { name, value } = event.target
                const colorObject = {
                    ...this.colorObject,
                    [name]: value
                }

                const color = tinycolor(colorObject).toHsv()
                this.$emit('input', color)
            }
        }
    }
</script>

<style scoped>
    .rgb-inputs {
        display: flex;
        & > * {
            flex: 1;
        }
    }
</style>
