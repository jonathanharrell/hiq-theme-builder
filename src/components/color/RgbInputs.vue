<template>
    <div class="rgb-inputs">
        <div>
            <input
                type="number"
                id="r"
                name="r"
                :value="colorObject.r"
                @input="updateColor"
            >
            <label for="r">R</label>
        </div>
        <div>
            <input
                type="number"
                id="g"
                name="g"
                :value="colorObject.g"
                @input="updateColor"
            >
            <label for="g">G</label>
        </div>
        <div>
            <input
                type="number"
                id="b"
                name="b"
                :value="colorObject.b"
                @input="updateColor"
            >
            <label for="b">B</label>
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
        color: var(--hiq-color-gray-4);
    }
</style>
