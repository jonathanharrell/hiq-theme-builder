<template>
    <div class="color-picker">
        <saturation-slider :value="value" @input="handleInput"></saturation-slider>
        <hue-slider :value="value" @input="handleInput"></hue-slider>
        <div class="text-inputs">
            <button
                v-for="mode in colorModes"
                :key="mode"
                @click="activeMode = mode"
            >
                {{ mode }}
            </button>
        </div>
    </div>
</template>

<script>
    import tinycolor from 'tinycolor2'
    import SaturationSlider from './SaturationSlider'
    import HueSlider from './HueSlider'

    export default {
        name: 'color-picker',

        components: {
            SaturationSlider,
            HueSlider
        },

        props: {
            value: {
                type: String,
                required: true
            }
        },

        data () {
            return {
                colorModes: ['hsl', 'rgb', 'hex', 'name'],
                activeMode: 'hsl'
            }
        },

        watch: {
            'activeMode' (mode) {
                const color = tinycolor(this.value)

                switch (mode) {
                    case 'hsl':
                        this.$emit('input', color.toHslString())
                        break

                    case 'rgb':
                        this.$emit('input', color.toRgbString())
                        break

                    case 'hex':
                        this.$emit('input', color.toHexString())
                        break

                    case 'name':
                        const name = color.toName()
                        if (name) this.$emit('input', name)
                        break

                    default:
                        break
                }
            }
        },

        methods: {
            handleInput (value) {
                const color = tinycolor(value)
                this.$emit('input', color.toHslString())
            }
        }
    }
</script>
