<template>
    <div
        class="saturation-slider"
        :class="{'disabled': disabled}"
        :style="{backgroundColor}"
        ref="container"
        @mousedown="handleMouseDown"
        @touchmove="handleChange"
        @touchstart="handleChange"
    >
        <div class="saturation-white"></div>
        <div class="saturation-black"></div>
        <div class="saturation-pointer" :style="{top: pointerTop, left: pointerLeft}">
            <div class="saturation-circle"></div>
        </div>
    </div>
</template>

<script>
    import tinycolor from 'tinycolor2'
    import { throttle } from 'lodash'

    export default {
        name: 'saturation-slider',

        props: {
            value: {
                type: String,
                required: true
            },

            disabled: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            colorObject () {
                const color = tinycolor(this.value)
                return color.toHsv()
            },

            backgroundColor () {
                return `hsl(${this.colorObject.h}, 100%, 50%)`
            },

            pointerTop () {
                return (-(this.colorObject.v * 100) + 1) + 100 + '%'
            },

            pointerLeft () {
                return this.colorObject.s * 100 + '%'
            }
        },

        methods: {
            throttle: throttle((fn, data) => {
                fn(data)
            }, 20, {
                'leading': true,
                'trailing': false
            }),

            handleChange (event, skip) {
                !skip && event.preventDefault()
                let container = this.$refs.container
                let containerWidth = container.clientWidth
                let containerHeight = container.clientHeight

                let xOffset = container.getBoundingClientRect().left + window.pageXOffset
                let yOffset = container.getBoundingClientRect().top + window.pageYOffset
                let pageX = event.pageX || (event.touches ? event.touches[0].pageX : 0)
                let pageY = event.pageY || (event.touches ? event.touches[0].pageY : 0)
                let left = pageX - xOffset
                let top = pageY - yOffset

                if (left < 0) left = 0
                else if (left > containerWidth) left = containerWidth
                else if (top < 0) top = 0
                else if (top > containerHeight) top = containerHeight

                let saturation = left / containerWidth
                let bright = -(top / containerHeight) + 1

                bright = bright > 0 ? bright : 0
                bright = bright > 1 ? 1 : bright

                this.throttle(this.onChange, {
                    h: this.colorObject.h,
                    s: saturation,
                    v: bright,
                    source: 'hsv'
                })
            },

            onChange (param) {
                this.$emit('input', param)
            },

            handleMouseDown () {
                window.addEventListener('mousemove', this.handleChange)
                window.addEventListener('mouseup', this.handleChange)
                window.addEventListener('mouseup', this.handleMouseUp)
            },

            handleMouseUp () {
                this.unbindEventListeners()
            },

            unbindEventListeners () {
                window.removeEventListener('mousemove', this.handleChange)
                window.removeEventListener('mouseup', this.handleChange)
                window.removeEventListener('mouseup', this.handleMouseUp)
            }
        }
    }
</script>

<style scoped>
    .saturation-slider {
        position: relative;
        width: 100%;
        padding: 25% 0;
        cursor: pointer;

        &.disabled {
            opacity: 0.5;
            pointer-events: none;
            cursor: not-allowed;
        }
    }

    .saturation-white,
    .saturation-black {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        cursor: pointer;
    }

    .saturation-white {
        background: linear-gradient(to right, white, rgba(255, 255, 255, 0));
    }

    .saturation-black {
        background: linear-gradient(to top, black, rgba(0, 0, 0, 0));
    }

    .saturation-pointer {
        position: absolute;
        cursor: pointer;
    }

    .saturation-circle {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        box-shadow:
            0 0 0 1.5px #fff,
            inset 0 0 1px 1px rgba(0, 0, 0, 0.3),
            0 0 1px 2px rgba(0, 0, 0, 0.4);
        transform: translate(-2px, -2px);
        cursor: head;
    }
</style>
