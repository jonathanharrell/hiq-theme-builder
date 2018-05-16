<template>
    <div class="hue-slider">
        <div class="hue-slider-container"
             ref="container"
             @mousedown="handleMouseDown"
             @touchmove="handleChange"
             @touchstart="handleChange"
        >
            <div class="hue-pointer" :style="{left: pointerLeft}">
                <div class="hue-picker"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import tinycolor from 'tinycolor2'

    export default {
        name: 'hue-slider',

        props: {
            value: {
                type: String,
                required: true
            }
        },

        data () {
            return {
                oldHue: 0,
                pullDirection: ''
            }
        },

        computed: {
            colorObject () {
                const color = tinycolor(this.value)
                return color.toHsl()
            },

            pointerLeft () {
                if (this.colorObject.h === 0 && this.pullDirection === 'right') return '100%'
                return (this.colorObject.h * 100) / 360 + '%'
            }
        },

        watch: {
            'colorObject' () {
                const h = this.value.h
                if (h !== 0 && h - this.oldHue > 0) this.pullDirection = 'right'
                if (h !== 0 && h - this.oldHue < 0) this.pullDirection = 'left'
                this.oldHue = h
            }
        },

        methods: {
            handleChange (event, skip) {
                !skip && event.preventDefault()

                let container = this.$refs.container
                let containerWidth = container.clientWidth

                let xOffset = container.getBoundingClientRect().left + window.pageXOffset
                let pageX = event.pageX || (event.touches ? event.touches[0].pageX : 0)
                let left = pageX - xOffset

                let h
                let percent

                if (left < 0) {
                    h = 0
                } else if (left > containerWidth) {
                    h = 360
                } else {
                    percent = left * 100 / containerWidth
                    h = (360 * percent / 100)
                }

                if (this.colorObject.h !== h) {
                    this.$emit('input', {
                        h: h,
                        s: this.colorObject.s,
                        l: this.colorObject.l,
                        source: 'hsl'
                    })
                }
            },

            handleMouseDown (event) {
                this.handleChange(event, true)
                window.addEventListener('mousemove', this.handleChange)
                window.addEventListener('mouseup', this.handleMouseUp)
            },

            handleMouseUp () {
                this.unbindEventListeners()
            },

            unbindEventListeners () {
                window.removeEventListener('mousemove', this.handleChange)
                window.removeEventListener('mouseup', this.handleMouseUp)
            }
        }
    }
</script>

<style scoped>
    .hue-slider {
        position: relative;
        width: 100%;
        height: 1rem;
        border-radius: 2px;
        background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
    }

    .hue-slider-container {
        cursor: pointer;
        margin: 0 2px;
        position: relative;
        height: 100%;
    }

    .hue-pointer {
        z-index: 2;
        position: absolute;
    }

    .hue-picker {
        cursor: pointer;
        width: 4px;
        border-radius: 1px;
        height: 1rem;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
        background: white;
        transform: translateX(-2px) ;
    }
</style>
