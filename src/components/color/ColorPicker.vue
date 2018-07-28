<template>
    <div class="color-picker">
        <saturation-slider
            :value="value"
            :disabled="activeMode === 'name'"
            @input="handleInput"
        ></saturation-slider>
        <hue-slider
            :value="value"
            :disabled="activeMode === 'name'"
            @input="handleInput"
        ></hue-slider>
        <button-group class="color-mode-options">
            <button
                v-for="mode in colorModes"
                :key="mode"
                :class="{ active: activeMode === mode}"
                @click="activeMode = mode"
                @keydown.tab="handleColorModeTab(mode, $event)"
            >
                {{ mode }}
            </button>
        </button-group>
        <hsl-inputs
            :value="value"
            @input="handleInput"
            v-if="activeMode === 'hsl'"
        ></hsl-inputs>
        <rgb-inputs
            :value="value"
            @input="handleInput"
            v-if="activeMode === 'rgb'"
        ></rgb-inputs>
        <hex-input
            :value="value"
            @input="handleInput"
            v-if="activeMode === 'hex'"
        ></hex-input>
        <name-input
            :value="value"
            @input="handleInput"
            v-if="activeMode === 'name'"
        ></name-input>
    </div>
</template>

<script>
    import tinycolor from 'tinycolor2'
    import SaturationSlider from './SaturationSlider'
    import HueSlider from './HueSlider'
    import ButtonGroup from '../base/ButtonGroup'
    import HslInputs from './HslInputs'
    import RgbInputs from './RgbInputs'
    import HexInput from './HexInput'
    import NameInput from './NameInput'

    export default {
        name: 'color-picker',

        components: {
            SaturationSlider,
            HueSlider,
            ButtonGroup,
            HslInputs,
            RgbInputs,
            HexInput,
            NameInput
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
            'activeMode' () {
                const colorValue = this.formatColorString(this.value)
                if (colorValue) this.$emit('input', colorValue)
            }
        },

        methods: {
            formatColorString (value) {
                const color = tinycolor(value)

                switch (this.activeMode) {
                    case 'hsl': return color.toHslString()
                    case 'rgb': return color.toRgbString()
                    case 'hex': return color.toHexString()
                    case 'name': return color.toName()
                }
            },

            handleInput (value) {
                const colorValue = this.formatColorString(value)
                if (colorValue) this.$emit('input', colorValue)
            },

            handleColorModeTab (mode, event) {
                if (mode === 'hsl' && event.key === 'Tab' && event.shiftKey) {
                    this.$emit('tabbed-out')
                }
            }
        }
    }
</script>

<style scoped>
    .hue-slider {
        margin-top: 0.5rem;
    }

    .color-mode-options {
        margin: 0.5rem 0;
    }
</style>
